const functions = require('firebase-functions');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const app1 = express();
const app2 = express();

/*** SERVER for Queries ***/
const server = new ApolloServer({
  typeDefs: require('./graphql/schema'),
  resolvers: require('./graphql/resolver')
});

/*** SERVER for Secure Queries and Mutations ***/
const secureServer = new ApolloServer({
  typeDefs: require('./graphql-secure/schema'),
  resolvers: require('./graphql-secure/resolver')
});

server.applyMiddleware({ app: app1 });
secureServer.applyMiddleware({ app: app2 });

exports.graphqlApi = functions.https.onRequest(app1);
exports.graphqlApiSec = functions.https.onRequest(app2);