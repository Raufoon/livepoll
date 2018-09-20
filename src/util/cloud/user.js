import {graphqlRequest, graphqlSecureRequest} from "./graphql-api/requests";

export const requestUserDataById = (id) => graphqlRequest(`
  {
    user(id: "${id}") {
      name,
      dob
    }
  }
`);

export const requestCreateUser = (id, info = {}) => graphqlSecureRequest(`
  mutation {
    user: createUser(
      id: "${id}",
      ${info.name ? 'name:"' + info.name + '",' : ''}
      ${info.dob ? 'dob:"' + info.dob + '",' : ''}
    ) {
      id,
      name,
      dob
    }
  }
`);