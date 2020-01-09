const { db } = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {


	let article = await db.findOne('articles', {
		id: req.params.id
	})

	article.published = req.body.a === 'pub'
		? !article.published
		: article.published

	if (req.body.a === 'sav' || req.body.a === 'pub' || req.body.a === 'pre') {

		const title = req.body.title,
			text = req.body.text

		const success = await db.update('articles', req.params.id, {
			title,
			text,
			published: article.published
		}).catch(err => {
			console.log('ERR', err)
		})

		if(req.body.a === 'sav' && success) {
			res.redirect('/articles/')
		}

		if(req.body.a === 'pre') {
			res.redirect('/preview/'+ article.id +'/')
		}
	}

	render(req, res, 'article', {
		title: 'Article',
		navActive: 'articles',
		article,
		titleSet: article.title && article.title.length > 0
	})
}
