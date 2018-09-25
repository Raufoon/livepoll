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
        isPrivate,
        itemFormat,
        othersCanAdd
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
      id,
      content{
        ... on TextContent{
          text
        }
      }
    }
  }
`;
export const requestAddPollitem = (pollId, content) => {
  return graphqlSecureRequest(MUTATION_ADD_POLL_ITEM, {
    pollId,
    content
  })
};

const QUERY_GET_FIRST_N_ITEMS = `
  query GetFirstNItems (
    $pollId: String!,
    $limit: Int!,
    $lastItemId: String
  ) {
    items: getFirstNItems (pollId: $pollId, limit: $limit, lastItemId: $lastItemId) {
      id,
      content {
        text
      },
      voteCount,
      voterIds
    }
  }
`;
export const requestFirstNItems = (pollId, limit, lastItemId) => graphqlRequest(QUERY_GET_FIRST_N_ITEMS, {
  pollId,
  limit,
  lastItemId
});