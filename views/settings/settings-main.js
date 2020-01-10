const helpers = require('../../libs/helpers/helpers.js')
const db = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {
  render(req, res, 'settings', {
    title: 'Settings',
    navActive: 'settings',
    subview: req.params.subview ? req.params.subview : 'general'
  })
}
