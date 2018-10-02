const definitions = `
  input InputBasicInfo{
    name: String!
    dob: String!
  }
  type BasicInfo {
    name: String!
    dob: String!
  }

  type User {
    id: ID!
    basicInfo: BasicInfo
    votedPolls: [String]!
    myPolls: [String]!
  }
`;

const queries = `
  user(id: ID!): User
  users(idList: [String]): [User]!
  haveIVoted(pollId: String!): String
`;

const mutations = `
  createUser: User
  updateProfileBasicInfo(newBasicInfo: InputBasicInfo): BasicInfo
`;

module.exports = {
  definitions,
  queries,
  mutations,
};