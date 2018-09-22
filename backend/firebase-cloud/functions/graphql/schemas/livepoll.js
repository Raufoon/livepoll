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
  type Livepoll {
    id: ID!
    settings: LivepollSettings!
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