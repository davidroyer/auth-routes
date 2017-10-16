const express = require('express')
const router = express.Router()
const admin = require('firebase-admin');
// const key = require("../serviceAccountKey.json");
// const cors = require('cors')({origin: true});
// var serviceAccount = require("../serviceAccountKey.json");
//
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://nsf1-9e7ac.firebaseio.com"
// });

// admin.initializeApp({
//     credential: admin.credential.cert(key),
//     databaseURL: `https://${key.project_id}.firebaseio.com`
// });

// var db = admin.database();
// var usersRef = db.ref("users");


const Posts = [
    {
      id: 1,
      title: "Post 1",
      content: "Post 1, my first post."
    },
    {
      id: 2,
      title: "Post 2",
      content: "Post 2, you always need more than one."
    }
  ]
// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/', (req, res) => {

  // let time = (new Date()).toJSON();
  // usersRef.push({
  //   msg: 'from auth-routes',
  //   time: time
  // });

  return res.json({ result: 'Main Api Page!' })
})

router.get('/posts', (req, res) => {
  return res.json(Posts)
})

router.get('/posts/:id', (req, res) => {
  const postID = parseInt(req.params.id)
  // const postID = req.params.id
  let Post = Posts.find(post => post.id === postID)
  console.log(Post);
  // family.filter(person => person.age > 18);
  return res.json(Post)
})
// Add POST - /api/login
router.post('/login', (req, res) => {
  return res.json({ username: 'demo' })
  // if (req.body.username === 'demo' && req.body.password === 'demo') {
  //   req.session.authUser = { username: 'demo' }
  //   return res.json({ username: 'demo' })
  // }
  // res.status(401).json({ message: 'Bad credentials' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  // delete req.session.authUser
  res.json({ ok: true })
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: router
}
