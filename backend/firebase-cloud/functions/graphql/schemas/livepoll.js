const enums = `
  enum PollItemFormat {
    T # text only
    TI # text with image
    TII # text with multiple images
    TV # text with video
  }
`;

const inputs = `
  input InputLivepollCreate {
    creatorId: String!
    title: String!
    startDatetime: String!
    endDatetime: String
    isPrivate: Boolean
    itemFormat: PollItemFormat!
    othersCanAdd: Boolean
    hideVoters: Boolean
  }
  input InputLivepollItemContent {
    text: String!
    imgUrl: String
    imgUrlList: [String]
    youtubeUrl: String
  }
`;

const livepollItemDef = `
  interface LivepollItemContent {
    text: String!
  }
  type TextContent implements LivepollItemContent {
    text: String!
  }
  type TextImageContent implements LivepollItemContent {
    text: String!
    imgUrl: String!
  }
  type TextImageListContent implements LivepollItemContent {
    text: String!
    imgUrlList: [String]!
  }
  type TextVideoContent implements LivepollItemContent {
    text: String!
    youtubeUrl: String!
  }
  type LivepollItem {
    id: String!
    creatorId: String
    content: LivepollItemContent!
    voteCount: Int!
    voterIds: [String]
  }
`;

const definitions = `
  ${enums}
  ${inputs}  
  type LivepollSettings {
    creatorId: String!
    title: String!
    startDatetime: String!
    endDatetime: String
    isPrivate: Boolean
    itemFormat: PollItemFormat!
    othersCanAdd: Boolean
    hideVoters: Boolean
  }
  ${livepollItemDef}  
  type Livepoll {
    id: ID!
    settings: LivepollSettings!
    items: [LivepollItem]
  }
`;

const queries = `
  livepoll(id: String!): Livepoll
  getTopItems(pollId: String!, startAt: Int!, howMany: Int!): [LivepollItem]

  getTrendingPolls(startAt: Int!, howMany: Int!): [Livepoll]
  getMostPopularPolls(startAt: Int!, howMany: Int!): [Livepoll]
  getRecentPolls(startAt: Int!, howMany: Int!): [Livepoll]
`;

const mutations = `
  publishLivepoll(settings: InputLivepollCreate!): Livepoll
  addItem(pollId: String!, content: InputLivepollItemContent!): LivepollItem
  vote(pollId: String!, votedItemId: String!): Int!
`;

module.exports = {
  definitions,
  queries,
  mutations,
};