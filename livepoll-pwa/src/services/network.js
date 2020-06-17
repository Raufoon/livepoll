import {get, post} from 'axios'
import {getAuthIDToken} from './auth'

const GRAPHQL_SERVER = 'http://us-central1-lllivepolll.cloudfunctions.net/graphql_v_2_0_0'

export function graphQlQuery(query) {
  return get(`${GRAPHQL_SERVER}?query=${query}`)
}

export async function graphQlMutation(query, variables) {
  const idToken = await getAuthIDToken()
  const headers = {
    'Authorization': idToken
  }
  return post(GRAPHQL_SERVER, {query, variables}, {headers})
}