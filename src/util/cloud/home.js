import {graphqlRequest} from "./graphql-api/requests";

const QUERY_POPULAR_POLLS = `
  query GetMostPopularPolls($startAt: Int!, $howMany: Int!) {
    popularPolls: getMostPopularPolls(startAt: $startAt, howMany: $howMany) {
      id,
      settings {
        title
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
      }
    }
  }
`;
export const requestTrendingPolls = (startAt, howMany) => {
  return graphqlRequest(QUERY_TRENDING_POLLS, {startAt, howMany});
};

const QUERY_RECENT_POLLS = `
  query GetRecentPolls($startAt: Int!, $howMany: Int!) {
    recentPolls: getRecentPolls(startAt: $startAt, howMany: $howMany) {
      id,
      settings {
        title
      }
    }
  }
`;
export const requestRecentPolls = (startAt, howMany) => {
  return graphqlRequest(QUERY_RECENT_POLLS, {startAt, howMany});
};