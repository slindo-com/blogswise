const { db } = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')

const markdownIt = require('markdown-it')()

exports.default = async (req, res) => {

	const subdomain = req.headers.host.split('.')[0]

	const blog = await db.findOne('blogs', {
		subdomain: subdomain != 'localhost:8145' ? subdomain : 'slindo'
	})

	if(!blog) {
		// 404
	}

	const articles = await db.find('articles', {
		blog: blog.id
	})

	const articlesRendered = articles.map(article => {
		article.text = markdownIt.render(article.text)
		return article
	})
	

	console.log(subdomain, blog)

	render(req, res, 'blog', {
		title: blog.title,
		description: blog.description,
		blog,
		articles: articlesRendered
	})
}
