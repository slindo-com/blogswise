const { db } = require('../../libs/db/db.js'),
	{ render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {


	let article = await db.findOne('articles', {
		id: req.params.id
	})

	render(req, res, 'preview-header', {
		title: 'Preview',
		article
	})
}
