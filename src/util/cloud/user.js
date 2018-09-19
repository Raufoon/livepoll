import {graphqlRequest} from "./graphql-api/requests";

export const fetchAllUsernames = () => {
  return graphqlRequest(`
    {
      users {
        name
      }
    }
  `);
};