const fs = require('fs')

const { Webserver } = require('./libs/webserver/webserver.js')

const helpers = require('./libs/helpers/helpers.js')

const views = {
  signIn: require('./libs/views/sign-in/index.js'),
  signUp: require('./libs/views/sign-up/index.js'),
  newBlog: require('./libs/views/new-blog/view.new-blog.js'),
  articles: require('./libs/views/articles/view.articles.js'),
  article: require('./libs/views/article/view.article.js'),
  preview: require('./libs/views/preview/view.preview.js'),
  projects: require('./libs/views/projects/view.projects.js'),
  tasks: require('./libs/views/tasks/view.tasks.js'),
  settings: require('./libs/views/settings/view.settings.js'),
  reports: require('./libs/views/reports/view.reports.js')
}
process.stdout.write('\033c');


const routes = [
  {
    pattern: '/sign-in/',
    view: views.signIn.main
  }, {
    pattern: '/sign-up/',
    view: views.signUp.main
  }, {
    pattern: '/new-blog/',
    view: views.newBlog.main,
    authRequired: true
  }, {
    pattern: '/articles/',
    view: views.articles.main,
    authRequired: true
  }, {
    pattern: '/article/:id/',
    view: views.article.main,
    authRequired: true
  }, {
    pattern: '/preview/:id/',
    view: views.preview.main,
    authRequired: true
  }, {
    pattern: '/preview-article/:id/',
    view: views.preview.article,
    authRequired: true
  }, {
    pattern: '/settings/',
    view: views.settings.main,
    authRequired: true
  }, {
    pattern: '/settings/projects/',
    view: views.projects.main,
    authRequired: true
  }, {
    pattern: '/settings/projects/archived/',
    view: views.projects.main,
    authRequired: true
  }, {
    pattern: '/settings/projects/new/',
    view: views.projects.new,
    authRequired: true
  }, {
    pattern: '/settings/projects/:id/edit/',
    view: views.projects.edit,
    authRequired: true
  }, {
    pattern: '/settings/projects/:id/a/:shouldBeArchived/',
    view: views.projects.archive,
    authRequired: true
  }, {
    pattern: '/settings/tasks/',
    view: views.tasks.main,
    authRequired: true
  }, {
    pattern: '/settings/tasks/archived/',
    view: views.tasks.main,
    authRequired: true
  }, {
    pattern: '/settings/tasks/new/',
    view: views.tasks.new,
    authRequired: true
  }, {
    pattern: '/settings/tasks/:id/edit/',
    view: views.tasks.edit,
    authRequired: true
  }, {
    pattern: '/settings/tasks/:id/a/:shouldBeArchived/',
    view: views.tasks.archive,
    authRequired: true
  }, {
    pattern: '/reports/',
    view: views.reports.main,
    authRequired: true
  }, {
    pattern: '/reports/:periodFilter/:projectsFilter/:tasksFilter/',
    view: views.reports.main,
    authRequired: true
  }
]



var webserver = new Webserver({
  port: 8145
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









/*

app.use(session({
  secret: 'D3GS-FH59-XY393foi',
  resave: true,
  saveUninitialized: true
}))

*/
