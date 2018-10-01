import {graphqlRequest} from "./graphql-api/requests";

const QUERY_POPULAR_POLLS = `
  query GetMostPopularPolls($startAt: Int!, $howMany: Int!) {
    popularPolls: getMostPopularPolls(startAt: $startAt, howMany: $howMany) {
      id,
      settings {
        title
      },
      items(startAt: 0, howMany: 1) {
        content {
          text
        },
        voteCount
      }
    }
  }
`;
export const requestPopularPolls = (startAt, howMany) => {
  return graphqlRequest(QUERY_POPULAR_POLLS, {startAt, howMany});
};

const QUERY_TRENDING_POLLS = `
  query GetTrendingPolls($startAt: Int!, $howMany: Int!) {
    trendingPolls: getTrendingPolls(startAt: $startAt, howMany: $howMany) {
      id,
      settings {
        title
      },
      items(startAt: 0, howMany: 1) {
        content {
          text
        },
        voteCount
      }
    }
  }
`;
export const requestTrendingPolls = (startAt, howMany) => {
  return graphqlRequest(QUERY_TRENDING_POLLS, {startAt, howMany});
};