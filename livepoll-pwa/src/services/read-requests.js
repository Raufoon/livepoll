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