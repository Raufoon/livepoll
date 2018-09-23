const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors')({origin: true});

admin.initializeApp();

/*** SERVER for Queries ***/
const app = express();
app.use(cors);

const server = new ApolloServer({
  typeDefs: require('./graphql/schema'),
  resolvers: require('./graphql/resolver')
});
server.applyMiddleware({ app });
exports.graphqlApi = functions.https.onRequest(app);
