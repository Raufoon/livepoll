import {graphqlRequest, graphqlSecureRequest} from "./graphql-api/requests";

const QUERY_USERDATA_BY_ID = `
  query UserInfo($id: ID!) {
    user(id: $id) {
      basicInfo {
        name,
        dob
      }
    }
  }
`;
export const requestUserDataById = (id) => {
  return graphqlRequest(QUERY_USERDATA_BY_ID, {id});
};

const MUTATION_CREATE_USER = `
  mutation CreateUser {
    user: createUser {
      id
    }
  }
`;
export const requestCreateUserWithOnlyId = () => {
  return graphqlSecureRequest(MUTATION_CREATE_USER)
};

const MUTATION_UPDATE_MY_PROFILE_BASIC_INFO = `
  mutation UpdateMyProfile (
    $newBasicInfo: InputBasicInfo
  ) {
    basicInfo: updateProfileBasicInfo(newBasicInfo: $newBasicInfo) {
      name,
      dob
    }
  }
`;
export const requestUpdateMyProfileBasicInfo = (newBasicInfo) => {
  return graphqlSecureRequest(MUTATION_UPDATE_MY_PROFILE_BASIC_INFO, {newBasicInfo})
};

const QUERY_CHECK_IF_ALREADY_VOTED = `
  query HaveIVoted($pollId: String!) {
    votedItemId: haveIVoted(pollId: $pollId)
  }
`;
export const requestCheckHaveIVoted = (pollId) => {
  return graphqlSecureRequest(QUERY_CHECK_IF_ALREADY_VOTED, {pollId})
};

const QUERY_GET_USERNAMES_BY_IDS = `
  query GetUsernamesByIds ($idList: [String]!) {
    users(idList: $idList) {
      id,
      basicInfo{
        name
      }
    }
  }
`;
export const requestUsernamesByIds = (idList) => {
  return graphqlRequest(QUERY_GET_USERNAMES_BY_IDS, {idList})
};