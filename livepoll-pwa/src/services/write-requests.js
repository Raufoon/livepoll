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
        text
        imgUrl        
      }
    }
  `, {
    pollId, newItem
  })
}
