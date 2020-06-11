const db = require('../../functions/realtimeDb')

const Node = {
  id: obj => obj.id,
}

const User = {
  ...Node,
  name: obj => obj.name,
  dob: obj => obj.dob,
  ownPolls: obj => obj.ownPolls || [],
  participations: obj => obj.participations || []
}

const LivePoll = {
  ...Node,
  title: obj => obj.title,
  startDateTime: obj => obj.startDateTime,
  endDateTime: obj => obj.endDateTime,
  author: obj => obj.author,
  shouldShowVoters: obj => obj.shouldShowVoters,
  privacy: obj => obj.privacy,
  whenToAddItem: obj => obj.whenToAddItem,
  votingSystem: obj => obj.votingSystem,
  itemContentType: obj => obj.itemContentType,
  capacity: obj => obj.capacity,
  items: obj => obj.items
}

const Item = {
  id: obj => obj.id,
  text: obj => obj.text,
  imgUrl: obj => obj.imgUrl,
  score: obj => obj.score,
  voters: obj => obj.voters
}

module.exports = {
  Node,
  User,
  LivePoll,
  Item
}