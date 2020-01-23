const bcrypt = require('bcrypt'),
	 helpers = require('../../libs/helpers/helpers.js'),
	{ db } = require('../../libs/db/db.js'),
	{ render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {

	var saved = false,
		blog = await db.findOne('blogs', {
		created_by: req.session.uid
	}),
		user = await db.findOne('users', {
		id: req.session.uid
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

		saved = true
		blog = await db.findOne('blogs', {
			created_by: req.session.uid
		})
	} else if (req.body.a === 'pro') {

		const success = await db.update('users', user.id, {
			name: req.body.name
		}).catch(err => {
			console.log('ERR', err)
		})

		saved = true
		user = await db.findOne('users', {
			id: req.session.uid
		})
	} else if (req.body.a === 'pas') {

		const match = await bcrypt.compare(req.body.oldpassword, user.password)

		if(match) {
			const hash = bcrypt.hashSync(req.body.newpassword, 10)
			const success = await db.update('users', user.id, {
				password: hash
			}).catch(err => {
				console.log('ERR', err)
			})

			if(success) {
				res.redirect('/settings/account/#success-password')
			} 
		}
	}


  render(req, res, 'settings', {
    title: 'Settings',
    navActive: 'settings',
    subview: req.params.subview ? req.params.subview : 'general',
    action: req.params.action,
    user,
    blog,
    saved
  })
}
