import graphqlRequest from "./graphql-api/requests";

const QUERY_USERDATA_BY_ID = `
  query UserInfo($id: ID!) {
    user(id: $id) {
      name,
      dob
    }
  }
`;
export const requestUserDataById = (id) => {
  return graphqlRequest(QUERY_USERDATA_BY_ID, {id});
};

const MUTATION_CREATE_USER = `
  mutation CreateUser (
    $id: ID!,
    $name: String,
    $dob: String,
  ) {
    user: createUser(id: $id, name: $name, dob: $dob) {
      id,
      name,
      dob,
    }
  }
`;
export const requestCreateUser = (id, info = {}) => {
  return graphqlRequest(MUTATION_CREATE_USER, {id, ...info})
};