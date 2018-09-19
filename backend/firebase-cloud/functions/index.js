const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

admin.initializeApp();

/*** SERVER for Queries ***/
const app1 = express();
const server = new ApolloServer({
  typeDefs: require('./graphql/schema'),
  resolvers: require('./graphql/resolver')
});
server.applyMiddleware({ app: app1 });
exports.graphqlApi = functions.https.onRequest(app1);

/*** SERVER for Secure Queries and Mutations ***/
const app2 = express();
app2.use(require('./middlewares/firebase-idtoken-validator'));
const secureServer = new ApolloServer({
  typeDefs: require('./graphql-secure/schema'),
  resolvers: require('./graphql-secure/resolver')
});
secureServer.applyMiddleware({ app: app2 });
exports.graphqlApiSec = functions.https.onRequest(app2);