const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')
const db = require('./realtimeDb')
const {types, query, mutation} = require('./graphql')
const graphqlHTTP = require('express-graphql')
const {GraphQLSchema} = require('graphql')
const fileUpload = require('./routers/file-upload')
const dummyServer = require('./routers/dummy-server')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV === 'production') {
  admin.initializeApp()  
}
else {
  const serviceAccount = require("./lllivepolll-411ae6bac230.json")
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://lllivepolll.firebaseio.com",
  })
}

exports.setUserProfile = functions.auth.user().onCreate(newUser => {
  const {uid, displayName, photoURL} = newUser
  db.write(`/users/${uid}`, {
    name: displayName,
    id: uid,
    avatar: photoURL
  })
})

const app = express()

app.use(cors)

app.use('/upload', fileUpload)

app.use('/graphql', graphqlHTTP(function(request, response) {
  return {
    schema: new GraphQLSchema({...types, query, mutation}),
    context: {
      getAuthUserId: async function() {
        const {uid} = await admin.auth().verifyIdToken(request.headers.authorization)
        return uid
      }
    },
    graphiql: process.env.NODE_ENV === 'development'
  }
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use('/dummy', dummyServer)

exports.server = functions.https.onRequest(app)
