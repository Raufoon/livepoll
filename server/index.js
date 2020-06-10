const express = require('express')
const graphqlHTTP = require('express-graphql')
const {schema, rootResolver} = require('./graphql')

const app = express()

app.use('/graphql/v2', graphqlHTTP({
  schema,
  rootValue: rootResolver,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(8000, () => console.log('Success'))