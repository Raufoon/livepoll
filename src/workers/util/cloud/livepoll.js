import {graphqlRequest, graphqlSecureRequest} from "./graphql-api/requests";
import {requestUsernamesByIds} from "./user";

const MUTATION_PUBLISH_LIVEPOLL = `
  mutation PublishLivepoll ($settings: InputLivepollCreate!) {
    livepoll: publishLivepoll (settings: $settings) {
      id
    }
  }
`;
export const requestPublishLivepoll = (idToken, livepollSettings) => {
  return graphqlSecureRequest(idToken, MUTATION_PUBLISH_LIVEPOLL, {
    settings: livepollSettings
  });
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
  return graphqlRequest(QUERY_POLL_INFO, {
    id: pollId
  })
    .then(response1 => {
      let livepoll = response1.livepoll;
      return requestUsernamesByIds([livepoll.settings.creatorId])
        .then(response2 => {
          livepoll.settings.creatorName = response2.users[0].basicInfo.name;
          return {
            livepoll
          }
        })
    });
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
export const requestAddPollitem = (idToken, pollId, content) => {
  return graphqlSecureRequest(idToken, MUTATION_ADD_POLL_ITEM, {
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
export const requestGiveVote = (idToken, pollId, votedItemId) =>
  graphqlSecureRequest(idToken, MUTATION_GIVE_VOTE, {
    pollId, votedItemId
  });

const QUERY_VOTER_LIST = `
  query GetVoterList($pollId: String!, $itemIdList: [String]!) {
    livepoll(id: $pollId) {
      items (idList: $itemIdList) {
        voterIds
      }
    }
  }
`;
export const requestVoterList = (pollId, itemIdList, startAt, howMany) => {
  return graphqlRequest(QUERY_VOTER_LIST, {
    pollId, itemIdList
  })
    .then(response => {
      const items = response.livepoll.items;
      if (items) {
        return requestUsernamesByIds(items[0].voterIds).then(response => response.users);
      }
      return Promise.reject('Not Found');
    });
};

const QUERY_VOTE_COUNT = `
  query GetVoterList($pollId: String!, $itemIdList: [String]!) {
    livepoll(id: $pollId) {
      items (idList: $itemIdList) {
        id,
        voteCount
      }
    }
  }
`;
export const requestVoteCountsByIdList = (pollId, itemIdList) => graphqlRequest(QUERY_VOTE_COUNT, {
  pollId, itemIdList
});