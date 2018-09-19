var axios = require('axios');

const SERVER_GRAPHQL = 'https://us-central1-lllivepolll.cloudfunctions.net/graphqlApi/graphql';
const SECURE_SERVER_GRAPHQL = 'https://us-central1-lllivepolll.cloudfunctions.net/graphqlApiSec/graphql';

export const graphqlRequest = (graphqlQuery) => {
  return axios.post(SERVER_GRAPHQL, {
    query: graphqlQuery
  }).then(response => response.data.data);
};