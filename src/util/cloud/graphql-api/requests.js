import axios from 'axios';

const SERVER_GRAPHQL = 'https://us-central1-lllivepolll.cloudfunctions.net/graphqlApi/graphql';

const graphqlRequest = (graphqlQuery, variables) => {
  return axios.post(SERVER_GRAPHQL, {
    query: graphqlQuery,
    variables
  }).then(response => {
    return response.data.data;
  });
};
export default graphqlRequest;