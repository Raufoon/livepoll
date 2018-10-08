import axios from 'axios';
import {getLoggedInUser} from "../auth";

const SERVER_GRAPHQL = 'https://us-central1-lllivepolll.cloudfunctions.net/graphqlApi/graphql';

export const graphqlRequest = (graphqlQueryString, variables) => {
  return axios.post(
    SERVER_GRAPHQL,
    {
      query: graphqlQueryString,
      variables
    })
    .then(response => {
      if (response.data.errors) {
        return Promise.reject(response.data.errors);
      }
      return response.data.data;
    });
};

export const graphqlSecureRequest = (graphqlQueryString, variables) => {
  return getLoggedInUser()
    .getIdToken()
    .then(idToken => {
      return axios.post(
        SERVER_GRAPHQL,
        {
          query: graphqlQueryString,
          variables
        }, {
          headers: {
            authorization: idToken
          }
        }
      );
    })
    .then(response => {
      if (response.data.errors) return Promise.reject(response.data.errors);
      return response.data.data;
    });
};