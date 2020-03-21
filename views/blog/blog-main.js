const { db } = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {

	render(req, res, 'blog', {
		title: 'Blog',
		req: JSON.stringify(req)
	})
}
