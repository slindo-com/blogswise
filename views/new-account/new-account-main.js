const bcrypt = require('bcryptjs')
const { db } = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {

  if (req.body.a === 's') {
    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log('ERR', err)
      }

      const id = await db.new('users', {
        email,
        password: hash
      }).catch(err => {
        console.log('ERR', err)
      })

      req.session = {
        auth: true,
        uid: id
      }

      res.setCookie('__Secure-Auth', {
        id,
        userAgent: req.headers['user-agent']
      })

      res.redirect('/articles')

      render(req, res, 'sign-up', {
        title: 'Sign Up'
      })
    })
  } else {
    render(req, res, 'sign-up', {
      title: 'Sign Up'
    })

  }
}