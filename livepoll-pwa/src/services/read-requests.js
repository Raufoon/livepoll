import {graphQlQuery} from './network'

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
