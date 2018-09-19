import {graphqlRequest, graphqlSecureRequest} from "./graphql-api/requests";

export const fetchAllUsernames = () => {
  return graphqlSecureRequest(`
    {
      users {
        name
      }
    }
  `);
};