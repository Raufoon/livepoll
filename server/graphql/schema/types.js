module.exports = `

interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String
  dob: String
  ownPolls: [LivePoll!]!
  participations: [LivePoll!]!
}

input UserInput {
  name: String
  dob: String
}

enum Privacy {
  PUBLIC
  PROTECTED
  PRIVATE
}

enum AdditionRestriction {
  BEFORE_START
  ALWAYS
}

enum VotingSystem {
  TICK_ONE
  TICK_MANY
  NUMBER_MANY
}

enum ItemContentType {
  TEXT
  AVATAR_TEXT
  IMAGE_CAPTION
  IMAGE_ONLY
}

enum Capacity {
  A_VS_B
  SMALL
  LARGE
}

type LivePoll implements Node {
  id: ID!
  title: String
  startDatetime: String!
  endDatetime: String
  author: User
  shouldShowVoters: Boolean
  privacy: Privacy
  whenToAddItem: AdditionRestriction
  votingSystem: VotingSystem
  itemContentType: ItemContentType
  capacity: Capacity
  items: [Item!]!
}

input LivePollInput {
  title: String
  startDatetime: String!
  endDatetime: String
  author: ID!
  shouldShowVoters: Boolean
  privacy: Privacy
  whenToAddItem: AdditionRestriction
  votingSystem: VotingSystem
  itemContentType: ItemContentType
  capacity: Capacity
}

type Item {
  id: ID!
  text: String
  imgUrl: String
  score: Int
  voters: [User!]
}

`