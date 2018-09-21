const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    dob: String
  }

  enum PollPrivacy {
    PUBLIC
    PRIVATE
  }
  enum PollItemFormat {
    TEXT
    TEXT_WITH_IMAGE
    TEXT_WITH_IMAGES
    TEXT_WITH_VIDEO
  }
  enum VoteType {
    TICK
    NUMBER10
    NUMBER100
  }
  enum WhoCanAddItem {
    ANY
    CREATOR
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

  type Query {
    user(id: ID!): User
    users: [User]!
  }

  type Mutation {
    createUser(id: ID!, name: String, dob: String): User
    publishLivepoll(settings: InputLivepollCreate!): Livepoll
  }
`;

module.exports = typeDefs;