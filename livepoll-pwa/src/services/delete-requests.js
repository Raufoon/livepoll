import { graphQlMutation } from "./network";

export function deletePoll(pollId) {
  return graphQlMutation(`
    mutation DeletePoll($pollId: ID!) {
      result: deletePoll(pollId: $pollId)
    }
  `, {pollId})
}