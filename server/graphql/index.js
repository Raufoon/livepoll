const {buildSchema} = require('graphql')
const typeSchema = require('./schema/types')
const querySchema = require('./schema/queries')
const mutationSchema = require('./schema/mutations')
const typeResolvers = require('./resolver/types')
const queryResolvers = require('./resolver/queries')
const mutationResolvers = require('./resolver/mutations')

exports.schema = buildSchema(`
  ${typeSchema}

  type Query {
    ${querySchema}
  }

  type Mutation {
    ${mutationSchema}
  }
`)

exports.rootResolver = {
  ...typeResolvers,
  ...queryResolvers,
  ...mutationResolvers
}