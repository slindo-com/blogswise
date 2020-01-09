const bcrypt = require('bcrypt')
const { db } = require('../../db/db.js')
const { render } = require('../../render/render.js')

const main = async (req, res) => {

  // IF ACTION = STANDARD (sign in) DO:
  if (req.body.a === 's') {
    const email = req.body.email
    const password = req.body.password


      const user = await db.findOne('users', {
        email
      })

      if (!user) {
        render(req, res, 'sign-in', {
          title: 'Sign In',
          err: 'ERROR! User not found'
        })
        return
      }

      const match = await bcrypt.compare(password, user.password)

      if (!match) {
        render(req, res, 'sign-in', {
          title: 'Sign In',
          err: 'ERROR! Password not correct'
        })
        return
      }

      res.setCookie('__Secure-Auth', {
        id: user.id,
        userAgent: req.headers['user-agent']
      })

      res.redirect('/articles')
  } else {
    render(req, res, 'sign-in', {
      title: 'Sign In'
    })
  }
}

exports.main = main
