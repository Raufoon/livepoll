const graphqlHTTP = require('express-graphql')
const types = require('./schema/types')
const query = require('./schema/query')
const mutation = require('./schema/mutation')
const {GraphQLSchema} = require('graphql')

module.exports = graphqlHTTP({
  schema: new GraphQLSchema({
    ...types,
    query,
    //mutation
  }),
  graphiql: process.env.NODE_ENV === 'development'
})