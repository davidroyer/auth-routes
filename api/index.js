const express = require('express')
const router = express.Router()
const admin = require('firebase-admin');
// const key = require("../serviceAccountKey.json");
// const cors = require('cors')({origin: true});
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "nsf1-9e7ac",
    clientEmail: "firebase-adminsdk-fk049@nsf1-9e7ac.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDpl8sbY1f+oHiB\nEzTFxt3OqQHweHMdtFCFmuxtJHs3zhhyLVzLGWoT9dzzdu8MHljnQ8RLvh0F2l+e\n/OCzwmE4KQt7pTL8fqTxobl6pIJAbGvKALUojnmwX7AqRwZeROW3PZ/lPf5CmBHx\nd0zNlMtYLYRGDIoXiKAtjE6uNCrE2kUFckOf1UulracGlrEUnpXp1yZ+uD3wmJjv\nFBybsHzd+cpkkvgtwR5i4swkGafPBYKgnn9ogreX0Hgl+GB/q2rjJdxg0grsZAy7\nvCI6y/UzhfIcIs3OQvAUiEoiUOU9C5d+8yM9qOFwU1H/N/tS0/pOffnNnGqTJJFu\nDzZJwQYdAgMBAAECggEABGpiTv1k65hvSV//u+Ct+bBCgUqtlmP9r6uFiOygcvtv\nhTJWp4ounKZQS76K90DYRQrdZOHOR6Q18YSYih1ZsXI+gtL/xeZuShkDWg5OXgG5\nVI4IiUs5gVGAZtQv38v6nFOgYvjLMR68cW2OuJt1mpBFs1NHsE6HWe+7NFoibX/P\ngO5p26XQHPB+2Dx/Qco27ZlrfgV9TM401EjDWzj7asStEYUh+negtNl4WBhTMeZL\nvuNXVn26h3zyonL6zQEjCb/P6/DvXhzuKndFg5YwKP2c0fGF7Jz7d1aPyhsnnM1W\nKMPNWbEuVoh2v7Qra4KnawuODrXZu/TmCVONykpAYQKBgQD3ky8e2Ky9NFBNtI7C\nf/jjfv7Ksn2zYexFVrWS+1emzXLkjCybel4qv/GZWYOI4Mg1+XLrTSGA5rULTeY6\nAtjiZ28SFBXAP6fQ6y4WCIR6XVh2Kur97MCyIDDKEV0sHulhseB5BR0OoLiWEjiC\nLHNG8mDq0NLPMG7HhGMH8lo0MQKBgQDxis0oaoLgMCU4YaGKTErmW8HH4sHCU0LX\nIJlMomDDYVc7FKobnvm7o967gjmwrEltVX4fE53k/MddIDOBp/1nRW52lxa9JY/I\nFHN2nS1A8FS3lR7ncd7Nk3zpSIRUhkJi1DXOLbDXYb5+lg0e6WbhXcWx6FBrp9/p\nWGqL+/yRrQKBgQCP5dChkTb10g5K3AOOMWusbwgRMKW3OddmhfuLruNHZGq/RGo5\nBGrvVhlLFKhLSruUA6Uz9uTeUzovk9uZJEaDcbMxQtNRpq4X1Fo5HEJEDTV5mYB0\njsOBxQwWpvkMx/rGeekK7lnxQqGHOJf3sXZfaknCshWVr4T0GpKk78xWQQKBgCwb\n7Ns0mDHYmPNy4M0goYzvtLOL9VZHXi1rBpO4E3OakxN28pmYroJVqpcTcPWSgNY2\nhpGmQ29NuhqHhuBmjSAOzd1aOgzQjzE6itteWKVDPjVIRhx97vIbvPPdCk1lNzpV\nBn5gWar7bo4vWLYMaX0+YpvakNUYEwvJ2as2mSkBAoGAc37VvNc1LuoPpjQi+bnz\nuUYq0h1Lm0pyOL6keHbkIgyCczDrnrkTxfB/6sIO868pWPKop2Gy4x3qZYSTp+oC\n9IOvCSwv6zZAx/GKpkUqq9tY6Bv23tJ6u7gFYehKau8U74MGiGCbPYgAmS9FFSmA\nJVyB9u4oTY5ofvsvbhz7DBw=\n-----END PRIVATE KEY-----\n"
  }),
  databaseURL: "https://nsf1-9e7ac.firebaseio.com"
});

// admin.initializeApp({
//     credential: admin.credential.cert(key),
//     databaseURL: `https://${key.project_id}.firebaseio.com`
// });

var db = admin.database();
var usersRef = db.ref("users");


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

  let time = (new Date()).toJSON();
  usersRef.push({
    msg: 'from auth-routes',
    time: time
  });

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
