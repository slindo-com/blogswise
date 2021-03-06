const { db } = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')

exports.default = async (req, res) => {

	const authorship = await db.find('authorship', {
		author: req.session.uid
	})

	if(authorship.length === 0) {
		res.redirect('/new-blog/')
	}
	
	const blog = await db.findOne('blogs', {
		id: authorship[0].blog
	})

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
