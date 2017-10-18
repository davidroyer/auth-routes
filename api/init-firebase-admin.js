'use strict';

const admin = require('firebase-admin')
const FB_CONFIG = require('./serviceAccountKey.json')
const privateKey = FB_CONFIG.private_key.replace(/\\n/g, '\n')

// apiKey: "AIzaSyD8Bvb6RMly9jVy783RuLuOsILcFtqcyDs",
// authDomain: "nsf1-9e7ac.firebaseapp.com",
// databaseURL: "https://nsf1-9e7ac.firebaseio.com",
// projectId: "nsf1-9e7ac",
// storageBucket: "nsf1-9e7ac.appspot.com",
// messagingSenderId: "1074718670658"

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: "nsf1-9e7ac",
//     clientEmail: "firebase-adminsdk-fk049@nsf1-9e7ac.iam.gserviceaccount.com",
//     privateKey: ""
//   }),
//   databaseURL: "https://nsf1-9e7ac.firebaseio.com"
// });


admin.initializeApp({
	credential: admin.credential.cert({
		projectId: FB_CONFIG.project_id,
		clientEmail: FB_CONFIG.client_email,
		privateKey: privateKey
	}),
	databaseURL: 'https://nsf1-9e7ac.firebaseio.com'
})

module.exports = admin
