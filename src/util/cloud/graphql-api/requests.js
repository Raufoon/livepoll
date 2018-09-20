import axios from 'axios';

import {getLoggedInUser} from "../auth";

const SERVER_GRAPHQL = 'https://us-central1-lllivepolll.cloudfunctions.net/graphqlApi/graphql';
const SECURE_SERVER_GRAPHQL = 'https://us-central1-lllivepolll.cloudfunctions.net/graphqlApiSec/graphql';

export const graphqlRequest = (graphqlQuery, variables) => {
  return axios.post(SERVER_GRAPHQL, {
    query: graphqlQuery,
    variables
  }).then(response => response.data.data);
};

export const graphqlSecureRequest = (graphqlQuery, variables) => {
  return getLoggedInUser()
    .getIdToken()
    .then(idToken =>
      axios.post(SECURE_SERVER_GRAPHQL, {
        query: graphqlQuery,
        variables
      }, {
        headers: {authorization: idToken}
      })
    ).then(response => response.data.data);
};