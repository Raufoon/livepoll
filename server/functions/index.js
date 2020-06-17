const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')
const db = require('./realtimeDb')
const {types, query, mutation} = require('./graphql')
const graphqlHTTP = require('express-graphql')
const {GraphQLSchema} = require('graphql')

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
  const {uid, displayName} = newUser
  db.write(`/users/${uid}`, {
    name: displayName,
    id: uid
  })
})

const app = express()
app.use(cors)
app.use('/', function(request, response) {
  return graphqlHTTP({
    schema: new GraphQLSchema({
      ...types,
      query,
      mutation
    }),
    context: {
      request,
      response,
      verifyIdToken: () => admin.auth().verifyIdToken()
    },
    graphiql: process.env.NODE_ENV === 'development'
  })
})

exports.graphql_v_2_0_0 = functions.https.onRequest(app)