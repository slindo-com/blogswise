const fs = require('fs')
const markdownIt = require('markdown-it')()

const { aws } = require('../../libs/aws/aws.js')
const { db } = require('../../libs/db/db.js')
const { minifyTemplate } = require('../../libs/helpers/helpers.js')

const indexTemplate = fs.readFileSync('./literals/blog-templates/index.tpl', 'utf8')

const generateIndex = async blogId =>
  new Promise(async (resolve, reject) => {


    const blog = await db.findOne('blogs', {
      id: blogId
    })

    const articles = await db.find('articles', {
      blog: blog.id
    })

    const blogTitle = blog.title
    const title = blog.title
    const description = blog.description

    const articlesRendered = articles.map(article => {
      article.text = markdownIt.render(article.text)
      return article
    })

    const rendered = minifyTemplate(eval('`' + indexTemplate + '`'))

    const test = await aws.s3.putObject(blog.bucket, 'index.html', rendered).catch(err => reject(err))

    resolve()
  })


const generateArticle = async articleId =>
  new Promise(async (resolve, reject) => {

    const article = await db.findOne('articles', {
      id: articleId
    })

    const blog = await db.findOne('blogs', {
      id: article.blog
    })

    const blogTitle = blog.title
    const title = article.title +' - '+ blog.title
    const description = article.title

    const articlesRendered = [article].map(article => {
      article.text = markdownIt.render(article.text)
      return article
    })

    const rendered = minifyTemplate(eval('`' + indexTemplate + '`'))

    const test = await aws.s3.putObject(blog.bucket, article.slug +'/index.html', rendered).catch(err => reject(err))

    resolve()
  })


const generateStyle = async blogId =>
  new Promise(async (resolve, reject) => {

    const blog = await db.findOne('blogs', {
      id: blogId
    })

    const css = fs.readFileSync('./minified/static/b.css').toString();

    await aws.s3.putObject(blog.bucket, 'style.css', css, 'text/css').catch(err => reject(err))

    resolve()
  })


exports.generateIndex = generateIndex
exports.generateArticle = generateArticle
exports.generateStyle = generateStyle

