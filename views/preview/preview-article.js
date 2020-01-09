const { db } = require('../../libs/db/db.js'),
	{ render } = require('../../libs/render/render.js')

const markdownIt = require('markdown-it')()

exports.default = async (req, res) => {


	let article = await db.findOne('articles', {
		id: req.params.id
	})

	const text = markdownIt.render(article.text)

	render(req, res, 'preview-article', {
		title: 'Preview',
		article,
		text
	})
}
