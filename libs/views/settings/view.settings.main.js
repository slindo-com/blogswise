const helpers = require('../../helpers/helpers.js')
const db = require('../../db/db.js')
const { render } = require('../../render/render.js')

exports.view = async (req, res) => {
  render(req, res, 'settings', {
    title: 'Settings',
    navActive: 'settings',
    subnavActive: 'settings'
  })
}
