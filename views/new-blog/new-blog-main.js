const uuidv4 = require('uuid/v4')
const { db } = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')
const { aws } = require('../../libs/aws/aws.js')

exports.default = async (req, res) => {

	if (req.body.a === 's') {
		const title = req.body.title,
			subdomain = req.body.subdomain

		const id = await db.new('blogs', {
			title,
			subdomain,
			created_by: req.session.uid,
			created_at: new Date()
		}).catch(err => {
			console.log('ERR', err)

			render(req, res, 'new-blog', {
				title: 'New Blog',
				navActive: 'articles',
			})
		})

		await db.new('authorship', {
			author: req.session.uid,
			blog: id,
			role: 1
		}).catch(err => {
			console.log('ERR', err)

			render(req, res, 'new-blog', {
				title: 'New Blog',
				navActive: 'articles',
			})
		})

		const bucketName = 'blog-'+ id +'-'+ uuidv4()

		await aws.s3.createBucket(bucketName).catch(err => {
			console.log('ERR', err)

			render(req, res, 'new-blog', {
				title: 'New Blog',
				navActive: 'articles',
			})
		})

		const success = await db.update('blogs', id, {
			bucket: bucketName
		}).catch(err => {
			console.log('ERR', err)
		})

		res.redirect('/articles/')
	}

	render(req, res, 'new-blog', {
		title: 'New Blog',
		navActive: 'articles',
	})
}
