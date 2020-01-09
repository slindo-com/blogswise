const { db } = require('../../db/db.js'),
	{ render } = require('../../render/render.js')

const markdown = require('markdown').markdown

exports.view = async (req, res) => {


	let article = await db.findOne('articles', {
		id: req.params.id
	})

	render(req, res, 'preview-header', {
		title: 'Preview',
		article
	})
}
