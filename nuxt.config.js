const bodyParser = require('body-parser')
const session = require('express-session')
const axios = require('axios')

module.exports = {
  head: {
    title: 'Auth Routes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'Auth Routes example' }
    ]
  },
  build: {
    vendor: ['axios']
  },
  generate: {
    routes: function () {
      // return axios.get('http://localhost:3000/api/posts')
      return axios.get('/api/posts')
        .then((res) => {
          return res.data.map((post) => {
            return '/posts/' + post.id
          })
        })
    }
    // routes () {
    //   return axios.get('/posts')
    //     .then((res) => {
    //       var rts = []
    //       res.data.forEach((d) => {
    //         rts.push('/' + d.id)
    //       })
    //       return rts
    //     })
    // }
  },
  /*
  ** Add server middleware
  ** Nuxt.js uses `connect` module as server
  ** So most of express middleware works with nuxt.js server middleware
  */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    // session({
    //   secret: 'super-secret-key',
    //   resave: false,
    //   saveUninitialized: false,
    //   cookie: { maxAge: 60000 }
    // }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ]
}
