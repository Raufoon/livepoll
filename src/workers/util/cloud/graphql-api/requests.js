import axios from 'axios';

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

export const graphqlSecureRequest = (idToken, graphqlQueryString, variables) => {
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
  ).then(response => {
    if (response.data.errors) return Promise.reject(response.data.errors);
    return response.data.data;
  });
};