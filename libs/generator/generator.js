const fs = require('fs')
const markdownIt = require('markdown-it')()

const { aws } = require('../../libs/aws/aws.js')
const { db } = require('../../libs/db/db.js')
const { minifyTemplate } = require('../../libs/helpers/helpers.js')

const indexTemplate = fs.readFileSync('./literals/blog-templates/index.tpl', 'utf8')

generateIndex = async blogId =>
  new Promise(async (resolve, reject) => {


    const blog = await db.findOne('blogs', {
      id: blogId
    })

    const articles = await db.find('articles', {
      blog: blog.id
    })

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


exports.generateIndex = generateIndex