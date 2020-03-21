const http = require('http'),
  fs = require('fs'),
  path = require('path'),
  url = require('url'),
  crypto = require('crypto')

class Webserver {
  constructor ({ port }) {
    this.port = port
    this.specificRoutes = {}
    this._startServer()
  }

  addRoutes (routes) {
    this.routes = {}
    routes.forEach(route => {
      var routeArr = route.pattern.split('/')
      routeArr.shift()
      routeArr.pop()
      route.arr = routeArr

      this.routes = recursivePatternSetter(this.routes, routeArr.map(val => val.substring(0, 1) === ':' ? '*' : val), route)
    })
  }

  addSpecificRoute (route, cb) {
    this.specificRoutes[route] = cb
  }

  _startServer () {
    this.server = http.createServer({
    }, this._handleReq.bind(this)).listen(this.port, () => {
      console.log('server running at ' + this.port)
    })
  }

  async _handleReq (req, res) {
    req = await parseReqQuery(req)
    req.getCookie = getCookie

    res.redirect = redirect
    res.setCookie = setCookie

    if (this.specificRoutes[req.url]) {
      this.specificRoutes[req.url](req, res)
      return
    }

    if (req.url.substring(req.url.length - 1) != '/') {
      res.redirect(req.url + '/')
      return
    }

    var routeArr = req.url.split('/')
    routeArr.shift()
    routeArr.pop()
    const routeParsed = recursiveUrlParser(this.routes, routeArr, [])

    if (routeParsed && routeParsed.pattern) {
      req = parseReqParams(req, routeParsed)

      if (routeParsed.authRequired) {
        const authCookie = req.getCookie('__Secure-Auth')

        if(!authCookie || authCookie.userAgent != req.headers['user-agent']) {
          res.redirect('/sign-in/')
          return
        }

        req.session = {}
        req.session.auth = true
        req.session.uid = authCookie.id
      }

      routeParsed.view(req, res)
    } else {
      res.end('404')
    }
  }
}

exports.Webserver = Webserver

const redirect = function (url) {
  this.writeHead(302, { 'Location': url })
  this.end()
}

const parseReqQuery = async req => {
  req.body = {}

  if (req.method === 'POST') {
    return new Promise((resolve, reject) => {
      var body = ''
      req.on('data', data => {

        body += data
        if (body.length > 1e6) {
          req.connection.destroy()
        }
      })

      req.on('end', () => {
        const queryArr = body.split('&').map(val => val.split('='))
        queryArr.forEach(val => req.body[val[0]] = decodeURIComponent( (val[1].replace(/\+/g, '%20')) ))
        resolve(req)
      })
    })
  } else {
    return req
  }
}

const parseReqParams = (req, routeParsed) => {
  req.params = {}
  if (routeParsed.arr) {
    routeParsed.arr.forEach(val => {
      if (val.substring(0, 1) === ':') {
        req.params[val.substring(1)] = routeParsed.params.shift()
      }
    })
  }
  return req
}

const recursivePatternSetter = (routingObject, routeArr, route) => {
  if (routeArr.length === 1) {
    routingObject[routeArr[0]] = route
    return routingObject
  }

  const step = routeArr.shift()
  routingObject[step] = routingObject[step] || {}
  routingObject[step] = recursivePatternSetter(routingObject[step], routeArr, route)
  return routingObject
}

const recursiveUrlParser = (routingObject, routeArr, params) => {
  if (routeArr.length === 0) {
    return {
      pattern: routingObject.pattern,
      view: routingObject.view,
      redirect: routingObject.redirect,
      authRequired: routingObject.authRequired,
      arr: routingObject.arr,
      params
    }
  }

  const step = routeArr.shift()

  if (routingObject[step]) {
    return recursiveUrlParser(routingObject[step], routeArr, params)
  } else if (routingObject['*']) {
    params.push(step)
    return recursiveUrlParser(routingObject['*'], routeArr, params)
  } else {
    return null
  }
}

const setCookie = function (key, val) {
  this.setHeader('Set-Cookie', key + '=' + encryptJSON(val) + '; Secure; Path=/')
}

const getCookie = function (key) {
  const str = RegExp('' + key + '[^;]+').exec(this.headers.cookie)
  try {
    return decryptJSON(decodeURIComponent(str ? str.toString().replace(/^[^=]+./, '') : ''))
  } catch (err) {
    return null
  }
}

const encryptJSON = json => {
  const cipher = crypto.createCipher('aes192', 'D3GS-FH59-XY393foi')
  let encrypted = cipher.update(JSON.stringify(json), 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

const decryptJSON = encrypted => {
  try {
    const decipher = crypto.createDecipher('aes192', 'D3GS-FH59-XY393foi')
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return JSON.parse(decrypted)
  } catch (err) {
    console.log(err)
    return null
  }
}
