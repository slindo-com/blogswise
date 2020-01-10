const { db } = require('../../libs/db/db.js'),
	{ render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {


	let article = await db.findOne('articles', {
		id: req.params.id
	})

	article.published = req.body.a === 'pub'
		? !article.published
		: article.published

	if (req.body.a === 'pub') {

		const success = await db.update('articles', req.params.id, {
			published: article.published
		}).catch(err => {
			console.log('ERR', err)
		})
	} else if(req.body.a === 'pre') {
		res.redirect('/article/'+ article.id +'/')
	}

	render(req, res, 'preview-header', {
		title: 'Preview',
		isEditor: false,
		article
	})
}
