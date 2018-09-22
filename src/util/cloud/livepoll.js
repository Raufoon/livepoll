import graphqlRequest from "./graphql-api/requests";

const MUTATION_PUBLISH_LIVEPOLL = `
  mutation PublishLivepoll ($settings: InputLivepollCreate!) {
    livepoll: publishLivepoll (settings: $settings) {
      id
    }
  }
`;
export const requestPublishLivepoll = livepollSettings => {
  return graphqlRequest(MUTATION_PUBLISH_LIVEPOLL, {settings: livepollSettings});
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