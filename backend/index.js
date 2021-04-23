const express = require('express')
const cors = require('cors')({ origin: true })
const firebase = require('firebase')
const { types, query, mutation } = require('./graphql')
const graphqlHTTP = require('express-graphql')
const { GraphQLSchema } = require('graphql')
// const fileUpload = require('./routers/file-upload')
const bodyParser = require('body-parser')

firebase.initializeApp({
  apiKey: 'AIzaSyBQSHVAGfc3pCsx6VBM-I0sMiT0r17Z5Ek',
  authDomain: 'lllivepolll.firebaseapp.com',
  databaseURL: 'https://lllivepolll.firebaseio.com',
  projectId: 'lllivepolll',
  storageBucket: 'lllivepolll.appspot.com',
  messagingSenderId: '1045079837725',
})

const app = express()

app.use(cors)

// app.use('/upload', fileUpload)

app.use(
  '/graphql',
  graphqlHTTP(function (request, response) {
    return {
      schema: new GraphQLSchema({ ...types, query, mutation }),
      context: {
        getAuthUserId: async function () {
          const { uid } = await admin
            .auth()
            .verifyIdToken(request.headers.authorization)
          return uid
        },
      },
      graphiql: process.env.NODE_ENV === 'development',
    }
  })
)

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(9000, () =>
  console.log('GraphQL server started on port http://localhost:9000')
)
