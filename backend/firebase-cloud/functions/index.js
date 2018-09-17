const functions = require('firebase-functions');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolver');

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });
exports.graphqlApi = functions.https.onRequest(app);