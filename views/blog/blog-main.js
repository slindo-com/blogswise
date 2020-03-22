const { db } = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')

const markdownIt = require('markdown-it')()

exports.default = async (req, res) => {

	const hostArr = req.headers.host.split('.')

	const subdomain = hostArr[0] === 'localhost:8145'
		? 'slindo'
		: hostArr[0]

	const blog = await db.findOne('blogs', {
		subdomain
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
