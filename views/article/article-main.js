const { db } = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')
const { generateIndex } = require('../../libs/generator/generator.js')

exports.default = async (req, res) => {

	const subview = req.params.subview ? req.params.subview : 'editor'

	let article = await db.findOne('articles', {
		id: req.params.id
	})

	article.published = req.body.a === 'pub'
		? !article.published
		: article.published

	if (req.body.a === 'sav' || req.body.a === 'pub' || req.body.a === 'pre') {

		article.title = req.body.title
		article.text = req.body.text

		const success = await db.update('articles', req.params.id, {
			text: article.text
		}).catch(err => {
			console.log('ERR', err)
		})

		generateIndex(article.blog)
		generateStyle(article.blog)

		if(req.body.a === 'pre') {
			res.redirect('/preview/'+ article.id +'/')
		}
	} else if (req.body.a === 'change-metadata') {

		article.title = req.body.title
		article.published = req.body.published

		const success = await db.update('articles', req.params.id, {
			title: article.title,
			published: article.published
		}).catch(err => {
			console.log('ERR', err)
		})

		generateIndex(article.blog)
		generateStyle(article.blog)

		res.redirect('/article/'+ req.params.id +'/options/#success-metadata')
	}


		generateIndex(article.blog)
		generateStyle(article.blog)


	render(req, res, 'article', {
		title: 'Article',
		navActive: 'articles',
		subview,
		article,
		isEditor: true,
		titleSet: article.title && article.title.length > 0
	})
}
