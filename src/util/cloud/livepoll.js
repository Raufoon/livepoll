import {graphqlSecureRequest} from "./graphql-api/requests";

const MUTATION_PUBLISH_LIVEPOLL = `
  mutation PublishLivepoll ($settings: InputLivepollCreate!) {
    livepoll: publishLivepoll (settings: $settings) {
      id
    }
  }
`;

export const requestPublishLivepoll = livepollSettings => {
  return graphqlSecureRequest(MUTATION_PUBLISH_LIVEPOLL, {
    settings: livepollSettings
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
export const requestAddPollitem = (pollId, content) => {
  return graphqlSecureRequest(MUTATION_ADD_POLL_ITEM, {
    pollId, content
  })
};