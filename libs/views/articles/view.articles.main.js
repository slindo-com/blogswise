const { db } = require('../../db/db.js')
const { render } = require('../../render/render.js')

exports.view = async (req, res) => {

	const blog = await db.findOne('blogs', {
		created_by: req.session.uid
	})

	if(!blog) {
		res.redirect('/new-blog/')
	}


	if (req.body.a === 's') {

		const id = await db.new('articles', {
			blog: blog.id,
			created_by: req.session.uid,
			created_at: new Date()
		}).catch(err => {
			console.log('ERR', err)
		})

		if(id) {
			res.redirect('/article/'+ id +'/')
		}
	}

	const articles = await db.find('articles', {
		blog: blog.id
	})

	render(req, res, 'articles', {
		title: 'Articles',
		navActive: 'articles',
		articles
	})
}
