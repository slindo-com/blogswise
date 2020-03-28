if (process.env.ENVIROMENT === 'dev') {
  const result = require('dotenv').config()
}

process.stdout.write('\033c');

const fs = require('fs')
const request = require('request')

const { Webserver } = require('./libs/webserver/webserver.js')

const helpers = require('./libs/helpers/helpers.js')

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

  if(req.headers.host.split('.')[0] === 'app') {
    res.redirect('/sign-in/')
  } else {
    request('http://slindo.blog.s3-website-us-east-1.amazonaws.com/').pipe(res)
  }
})


webserver.addSpecificRoute('/style.css', (req, res) => {

  if(req.headers.host.split('.')[0] === 'app') {
    res.redirect('/sign-in/')
  } else {
    request('http://slindo.blog.s3-website-us-east-1.amazonaws.com/style.css').pipe(res)
  }
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






/*

app.use(session({
  secret: 'D3GS-FH59-XY393foi',
  resave: true,
  saveUninitialized: true
}))

*/
