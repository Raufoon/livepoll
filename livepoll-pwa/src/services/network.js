import {get, post} from 'axios'
import {getAuthIDToken} from './auth'

const GRAPHQL_SERVER = 'http://us-central1-lllivepolll.cloudfunctions.net/graphql_v_2_0_0'

export function graphQlQuery(query) {
  return get(`${GRAPHQL_SERVER}?query=${query}`)
}

export function graphQlMutation(mutation, variables) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': getAuthIDToken()
  }
  return post(GRAPHQL_SERVER, {variables}, {headers})
}