const { db } = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {

	const blog = await db.findOne('blogs', {
		created_by: req.session.uid
	})

	if(!blog) {
		res.redirect('/new-blog/')
	}


	if (req.body.a === 's') {

		const id = await db.new('articles', {
			blog: blog.id,
			created_by: req.session.uid,
			created_at: new Date()
		}).catch(err => {
			console.log('ERR', err)
		})

		if(id) {
			res.redirect('/article/'+ id +'/')
		}
	}

	const articles = await db.find('articles', {
		blog: blog.id
	})

	const articlesDraft = articles.filter(article => !article.published),
		articlesPublished = articles.filter(article => article.published)

	render(req, res, 'articles', {
		title: 'Articles',
		navActive: 'articles',
		articlesDraft,
		articlesPublished,
		hasArticles: articles.length > 0
	})
}
