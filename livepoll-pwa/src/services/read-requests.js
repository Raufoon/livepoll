import {graphQlQuery, graphQlSecureQuery} from './network'

export function fetchProfileDetails(uid) {
  return graphQlQuery(`
    query FetchProfileDetails {
      user(id: "${uid}") {
        id
        name
        dob
      }
    }
  `)
}

export function loadRecentPollsForHome() {
  return graphQlQuery(`
    query LoadRecentPollsForHome {
      home {
        recentPolls{
          id
          title
          startDateTime
        }
      }
    }
  `)
}


export function fetchPollDetails(id) {
  return graphQlQuery(`
    query FetchPollDetails {
      poll(id: "${id}") {
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
  `)
}

export function fetchPollItems(id) {
  return graphQlQuery(`
    query FetchPollItems {
      poll(id: "${id}") {
        id
        items {
          id
          creatorId
          text
          imgUrl
          score
        }
      }
    }
  `)
}

export function fetchVotedItemId(pollId) {
  return graphQlSecureQuery(`
    query WhichDidIVote {
      votedItemId: whichDidIVote(pollId: "${pollId}")
    }
  `)
}
