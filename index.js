const fs = require('fs')

const { Webserver } = require('./libs/webserver/webserver.js')

const helpers = require('./libs/helpers/helpers.js')

process.stdout.write('\033c');

const viewFolders = fs.readdirSync('./views/')

let views = {}

viewFolders.forEach(folder => {
  const viewsForFolder = fs.readdirSync('./views/'+ folder +'/').map(file => file.split('.')[0]).filter(file => file != '')

  viewsForFolder.forEach(file => {
    views[file] = require('./views/' + folder + '/'+ file +'.js').default
  })
  
})


const routes = [
  {
    pattern: '/sign-in/',
    view: views['sign-in-main']
  }, {
    pattern: '/new-account/',
    view: views['new-account-main']
  }, {
    pattern: '/new-blog/',
    view: views['new-blog-main'],
    authRequired: true
  }, {
    pattern: '/articles/',
    view: views['articles-main'],
    authRequired: true
  }, {
    pattern: '/article/:id/',
    view: views['article-main'],
    authRequired: true
  }, {
    pattern: '/article/:id/:subview/',
    view: views['article-main'],
    authRequired: true
  }, {
    pattern: '/preview-article/:id/',
    view: views['preview-article'],
    authRequired: true
  }, {
    pattern: '/settings/',
    view: views['settings-main'],
    authRequired: true
  }, {
    pattern: '/settings/:subview/',
    view: views['settings-main'],
    authRequired: true
  }, {
    pattern: '/settings/:subview/:action/',
    view: views['settings-main'],
    authRequired: true
  }, {
    pattern: '/:id/',
    view: views['blog-main'],
    authRequired: false
  }
]



var webserver = new Webserver({
  port: process.env.PORT || 8145
})

webserver.addRoutes(routes)

webserver.addSpecificRoute('/', (req, res) => {
  console.log(req.session)
  res.redirect('/sign-in/')
})



webserver.addSpecificRoute('/s', (req, res) => {
  fs.readFile('./minified/static/s.css', (err, content) => {
    res.setHeader('Cache-Control', 'public, max-age=86400000')
    res.writeHead(200, { 'Content-Type': 'text/css' })
    res.end(content, 'utf-8')
  })
})

webserver.addSpecificRoute('/favicon.ico', (req, res) => {
  fs.readFile('./favicon.ico', (err, content) => {
    res.writeHead(200, { 'Content-Type': 'image/x-icon' })
    res.end(content, 'utf-8')
  })
})

webserver.addSpecificRoute('/.well-known/acme-challenge/lGmKmDcc8JgfT0ItIvgEO308XwR5-0eg4E64pQvrVmA', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('lGmKmDcc8JgfT0ItIvgEO308XwR5-0eg4E64pQvrVmA.hGCXK83K1SKEQErJMkV4DcV5QDpF4BoXLb30v8yoYo8', 'utf-8')
})









/*

app.use(session({
  secret: 'D3GS-FH59-XY393foi',
  resave: true,
  saveUninitialized: true
}))

*/
