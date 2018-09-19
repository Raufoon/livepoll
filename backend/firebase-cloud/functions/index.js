const functions = require('firebase-functions');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

/*** SERVER for Queries ***/
const app = express();
const server = new ApolloServer({
  typeDefs: require('./graphql/schema'),
  resolvers: require('./graphql/resolver')
});
server.applyMiddleware({ app });
exports.graphqlApi = functions.https.onRequest(app);

/*** SERVER for Secure Queries and Mutations ***/
const secureServer = new ApolloServer({
  typeDefs: require('./graphql-secure/schema'),
  resolvers: require('./graphql-secure/resolver')
});
secureServer.applyMiddleware({ app });
exports.graphqlApiSec = functions.https.onRequest(app);