import axios from 'axios';
import {getLoggedInUser} from "../auth";

const SERVER_GRAPHQL = 'https://us-central1-lllivepolll.cloudfunctions.net/graphqlApi/graphql';

export const graphqlRequest = (graphqlQuery, variables) => {
  return axios.post(
    SERVER_GRAPHQL,
    {
      query: graphqlQuery,
      variables
    }).then(response => {
      if (response.data.errors) return Promise.reject(0);
      return response.data.data;
    });
};

export const graphqlSecureRequest = (graphqlQuery, variables) => {
  return getLoggedInUser()
    .getIdToken()
    .then((idToken) => {
      return axios.post(
        SERVER_GRAPHQL,
        {
          query: graphqlQuery,
          variables
        }, {
          headers: {
            authorization: idToken
          }
        }
      );
    })
    .then(response => {
      if (response.data.errors) return Promise.reject(0);
      return response.data.data;
    });
};