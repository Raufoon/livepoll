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
        othersCanAdd,
        showVoters
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
  query GetTopItems (
    $pollId: String!,
    $startAt: Int!,
    $howMany: Int!
  ) {
    livepoll(id: $pollId) {
      items(startAt: $startAt, howMany: $howMany) {
        id,
        content {
          text
        },
        voteCount
      }
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

export const requestVoterList = (pollId, itemId, startAt, howMany) => {
  return graphqlRequest(`
  query getPollInfo {
    livepoll(id: "${pollId}") {
      items(id: "${itemId}"){
        voterIds
      }
    }
  }
  `).then(response => {
    const items = response.livepoll.items;
    if (items) {
      return items[0].voterIds;
    }
    return Promise.reject('Not Found');
  });
};