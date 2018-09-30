import {graphqlRequest} from "./graphql-api/requests";

const QUERY_POPULAR_POLLS = `
  query UserInfo($id: ID!) {
    user(id: $id) {
      basicInfo {
        name,
        dob
      }
    }
  }
`;
export const requestPopularPolls = (start, limit) => {
  return graphqlRequest(QUERY_POPULAR_POLLS, {start, limit});
};