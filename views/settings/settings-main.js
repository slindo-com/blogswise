const helpers = require('../../libs/helpers/helpers.js'),
	{ db } = require('../../libs/db/db.js'),
	{ render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {

	var blog = await db.findOne('blogs', {
		created_by: req.session.uid
	})

	if (req.body.a === 'met') {

		const success = await db.update('blogs', blog.id, {
			title: req.body.title,
			description: req.body.description,
			language: req.body.language,
			timezone: req.body.timezone
		}).catch(err => {
			console.log('ERR', err)
		})

		blog = await db.findOne('blogs', {
			created_by: req.session.uid
		})
	}


  render(req, res, 'settings', {
    title: 'Settings',
    navActive: 'settings',
    subview: req.params.subview ? req.params.subview : 'general',
    blog
  })
}
