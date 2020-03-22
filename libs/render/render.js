const fs = require('fs')
const zlib = require('zlib')

const { minifyTemplate } = require('../../libs/helpers/helpers.js')

var templates = {
  views: {},
  partials: {}
}

const readFiles = folder => fs.readdirSync(folder).map(file => file.split('.')[0]).filter(file => file.length > 0)

const partialsArr = readFiles('./literals/partials/'),
  viewsArr = readFiles('./literals/views/')

partialsArr.forEach(partial =>
  templates.partials[partial] = fs.readFileSync('./literals/partials/' + partial + '.tpl', 'utf8')
)

viewsArr.forEach(view => {
  templates.views[view] = fs.readFileSync('./literals/views/' + view + '.tpl', 'utf8')

  partialsArr.forEach(partial =>
  	templates.views[view] = templates.views[view].split('{{' + partial + '}}').join(templates.partials[partial])
  )
})

const areQuotesRemoveable = val => /^[^ \t\n\f\r"'`=<>]+$/.test(val)

Object.keys(templates.views).forEach(key => {
  templates.views[key] = minifyTemplate(templates.views[key])
})

delete templates.partials

const render = async (req, res, view, d) => {
  const rendered = eval('`' + templates.views[view] + '`')

  const acceptEncoding = req.headers['accept-encoding']
  if (!acceptEncoding) {
    acceptEncoding = ''
  }

  if (acceptEncoding.match(/\bdeflate\b/)) {
  	console.log('DEFLATE')
    const toSend = zlib.deflateSync(rendered)
    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Encoding': 'deflate' })
    res.end(toSend, 'utf-8')
  } else if (acceptEncoding.match(/\bgzip\b/)) {
  	console.log('GZIP')
  	const toSend = zlib.gzipSync(rendered)
    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Encoding': 'gzip' })
    res.end(toSend, 'utf-8')
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const toSend = rendered
    res.end(toSend, 'utf-8')
  }
}

exports.render = render
