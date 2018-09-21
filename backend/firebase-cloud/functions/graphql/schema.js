const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    dob: String
  }

  enum PollPrivacy {
    public
    private
  }
  enum PollItemFormat {
    text
    textWithImage
    textWithImages
    textWithVideo
  }
  enum VoteType {
    tickVote
    numberVote010
    numberVote0100
  }
  enum WhoCanAddItem {
    anyone
    onlyCreator
  }
  type LivepollSettings {
    title: String!
    startDatetime: String!
    endDatetime: String!
    privacy: PollPrivacy!
    voteType: VoteType!
    format: PollItemFormat!
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
    publishLivepoll(settings: LivepollSettings!): Livepoll
  }
`;

module.exports = typeDefs;