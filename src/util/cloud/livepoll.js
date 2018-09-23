import {graphqlRequest, graphqlSecureRequest} from "./graphql-api/requests";

const MUTATION_PUBLISH_LIVEPOLL = `
  mutation PublishLivepoll ($settings: InputLivepollCreate!) {
    livepoll: publishLivepoll (settings: $settings) {
      id
    }
  }
`;
export const requestPublishLivepoll = livepollSettings => {
  return graphqlSecureRequest(MUTATION_PUBLISH_LIVEPOLL, {settings: livepollSettings});
};

const QUERY_POLL_INFO = `
  query getPollInfo ($id: String!) {
    livepoll(id: $id) {
      id,
      settings {
        creatorId,
        title,
        startDatetime,
        endDatetime,
        privacy,
        voteType,
        itemFormat,
        whoCanAddItem
      }
    }
  }
`;
export const requestPollInfo = pollId => {
  return graphqlRequest(QUERY_POLL_INFO, {id: pollId});
};

const MUTATION_ADD_POLL_ITEM = `
  mutation AddPollItem (
    $pollId: String!,
    $content: InputLivepollItemContent! 
  ) {
    item: addItem(pollId: $pollId, content: $content) {
      id
    }
  }
`;
export const requestAddPollitem = (pollId, content) => {
  return graphqlSecureRequest(MUTATION_ADD_POLL_ITEM, {
    pollId,
    content
  })
};