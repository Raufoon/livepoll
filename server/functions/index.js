const functions = require('firebase-functions')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const {schema, rootResolver} = require('../graphql')
const cors = require('cors')({origin: true})

const app = express()

app.use(cors)

app.use('/', graphqlHTTP({
  schema,
  rootValue: rootResolver,
  graphiql: process.env.NODE_ENV === 'development'
}))

exports.graphql_v_2_0_0 = functions.https.onRequest(app)