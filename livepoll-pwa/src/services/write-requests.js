import { graphQlMutation } from "./network";

export function editProfile(details) {
  return graphQlMutation(`
    mutation EditProfileDetails($details: UserInput!) {
      newDetails: editUserDetails(newDetails: $details) {
        id
        name
        dob
      }
    }
  `, {details})
}

export function createNewPoll(data) {
  return graphQlMutation(`
    mutation CreateNewPoll($data: LivePollInput!) {
      newPoll: createLivePoll(newPoll: $data) {
        id
        title
        startDateTime
        endDateTime
        author {
          id
          name
        }
        shouldShowVoters
        usagePrivacy
        whenToAddItem
        votingSystem
        itemContentType
      }
    }
  `, {data})
}

export function createNewItem(pollId, newItem) {
  return graphQlMutation(`
    mutation CreateNewItem($pollId: ID!, $newItem: ItemInput!) {
      newItem: addItemToPoll(pollId: $pollId, newItem: $newItem) {
        id
        text
        imgUrl        
      }
    }
  `, {
    pollId, newItem
  })
}

export function voteForItem(pollId, itemId, voteValue) {
  return graphQlMutation(`
    mutation Vote($pollId: ID!, $itemId: ID!, $voteValue: Int!) {
      updatedItems: vote(pollId: $pollId, itemId: $itemId, voteValue: $voteValue) {
        id
        score        
      }
    }
  `, {
    pollId, itemId, voteValue
  })
}

export function unvoteItem(pollId, itemId, voteValue) {
  return graphQlMutation(`
    mutation Unvote($pollId: ID!, $itemId: ID!, $voteValue: Int!) {
      updatedItem: unvote(pollId: $pollId, itemId: $itemId, voteValue: $voteValue) {
        id
        score        
      }
    }
  `, {
    pollId, itemId, voteValue
  })
}
