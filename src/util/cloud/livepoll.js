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
      },
      voteCount
    }
  }
`;
export const requestAddPollitem = (pollId, content) => {
  return graphqlSecureRequest(MUTATION_ADD_POLL_ITEM, {
    pollId, content
  })
};

const QUERY_TOP_ITEMS = `
  query GetFirstNItems (
    $pollId: String!,
    $startAt: Int!,
    $howMany: Int!
  ) {
    items: getTopItems (pollId: $pollId, startAt: $startAt, howMany: $howMany) {
      id,
      content {
        text
      },
      voteCount,
      voterIds
    }
  }
`;
export const requestTopItems = (pollId, startAt, howMany) => graphqlRequest(QUERY_TOP_ITEMS, {
  pollId, startAt, howMany
});

const MUTATION_GIVE_VOTE = `
  mutation GiveVote(
    $pollId: String!,
    $votedItemId: String!
  ) {
    voteCount: vote(pollId: $pollId, votedItemId: $votedItemId)
  }
`;
export const requestGiveVote = (pollId, votedItemId) => graphqlSecureRequest(MUTATION_GIVE_VOTE, {
  pollId, votedItemId
});