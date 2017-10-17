const express = require('express')
const router = express.Router()
const admin = require('firebase-admin');
// const key = require("../serviceAccountKey.json");
// const cors = require('cors')({origin: true});
// var serviceAccount = require("../serviceAccountKey.json");

//
// let firebaseServiceAccount = {
//   "type": "service_account",
//   "project_id": process.env.FIREBASE_PROJECT_ID,
//   "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
//   "private_key": process.env.FIREBASE_PRIVATE_KEY,
//   "client_email": process.env.FIREBASE_CLIENT_EMAIL,
//   "client_id": process.env.FIREBASE_CLIENT_ID,
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://accounts.google.com/o/oauth2/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
// }

// admin.initializeApp({
//   credential: admin.credential.cert(firebaseServiceAccount),
//   databaseURL: "https://nsf1-9e7ac.firebaseio.com"
// })

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

  // console.log(usersRef);
  let time = (new Date()).toJSON();
  // usersRef.push({
  //   msg: 'from auth-routes - LIVE',
  //   time: time
  // });

  return res.json({ result: 'Main Api Page NEW!' })
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
