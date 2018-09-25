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
  getFirstNItems(pollId: String!, limit: Int!, lastItemId: String): [LivepollItem]
`;

const mutations = `
  publishLivepoll(settings: InputLivepollCreate!): Livepoll
  addItem(pollId: String!, content: InputLivepollItemContent!): LivepollItem
`;

module.exports = {
  definitions,
  queries,
  mutations,
};