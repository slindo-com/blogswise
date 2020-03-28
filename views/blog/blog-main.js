const { db } = require('../../libs/db/db.js')
const { render } = require('../../libs/render/render.js')

const request = require('request')
const markdownIt = require('markdown-it')()

exports.default = async (req, res) => {

	const hostArr = req.headers.host.split('.')

	const subdomain = hostArr[0] === 'localhost:8145'
		? 'slindo'
		: hostArr[0]

	request('http://slindo-blog.s3-website-us-east-1.amazonaws.com/'+ req.params.id +'/').pipe(res)
}
