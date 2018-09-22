const definitions = `
  enum PollPrivacy {
    PB # public
    PR # private
  }
  enum PollItemFormat {
    T # text only
    TI # text with image
    TII # text with multiple images
    TV # text with video
  }
  enum VoteType {
    T # vote by tick
    N10 # vote by 0 to 10
    N100 # vote by 0 to 100
  }
  enum WhoCanAddItem {
    A # anyone
    C # only creator
  }
  
  input InputLivepollCreate {
    creatorId: String!
    title: String!
    startDatetime: String!
    endDatetime: String!
    privacy: PollPrivacy!
    voteType: VoteType!
    itemFormat: PollItemFormat!
    whoCanAddItem: WhoCanAddItem!
  }
  
  type LivepollSettings {
    creatorId: String!
    title: String!
    startDatetime: String!
    endDatetime: String!
    privacy: PollPrivacy!
    voteType: VoteType!
    itemFormat: PollItemFormat!
    whoCanAddItem: WhoCanAddItem!
  }
  
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
    content: LivepollItemContent!
  }
  
  type Livepoll {
    id: ID!
    settings: LivepollSettings!
    items: [LivepollItem]
  }
`;

const queries = `
  livepoll(id: String!): Livepoll
`;

const mutations = `
  publishLivepoll(settings: InputLivepollCreate!): Livepoll
`;

module.exports = {
  definitions,
  queries,
  mutations,
};