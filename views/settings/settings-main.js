const bcrypt = require('bcryptjs'),
	 helpers = require('../../libs/helpers/helpers.js'),
	{ db } = require('../../libs/db/db.js'),
	{ render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {

	var saved = false

	const authorship = await db.find('authorship', {
		author: req.session.uid
	})
	
	var blog = await db.findOne('blogs', {
		id: authorship[0].blog
	})
	
	var user = await db.findOne('users', {
		id: req.session.uid
	})

	var invites = await db.find('invites', {
		blog: blog.id
	})

	const authorsForBlog = await db.find('authorship', {
		blog: blog.id
	})

	const userIds = authorsForBlog.map(val => val.author)

	const authors = await db.getByValues('users', 'id', userIds)

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
			id: authorship[0].blog
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
	} else if (req.body.a === 'ema') {

		const token = [...Array(30)].map(() => Math.random().toString(36)[2]).join('')

		const success = await db.new('new_email', {
			token: token,
			created_by: user.id,
			email: req.body.email,
			created_at: new Date()
		}).catch(err => {
			console.log('ERR', err)
		})

		// EMAIL
		console.log('TOKEN', success, token)

		if(success) {
			res.redirect('/settings/account/#success-email')
		} 
	} else if (req.body.a === 'new-author') {

		const token = [...Array(30)].map(() => Math.random().toString(36)[2]).join('')

		const success = await db.new('invites', {
			token,
			email: req.body.email,
			name: req.body.name,
			blog: blog.id,
			created_at: new Date()
		}).catch(err => {
			console.log('ERR', err)
		})

		// EMAIL
		console.log('TOKEN', success, token)

		if(success) {
			res.redirect('/settings/team/#success-invite')
		} 
	}


	render(req, res, 'settings', {
		title: 'Settings',
		navActive: 'settings',
		subview: req.params.subview ? req.params.subview : 'general',
		action: req.params.action,
		user,
		blog,
		saved,
		authors,
		invites
	})
}
