import {get, post} from 'axios'
import {getAuthIDToken} from './auth'

const GRAPHQL_SERVER = 'http://us-central1-lllivepolll.cloudfunctions.net/graphql_v_2_0_0'

export async function graphQLQuery(query) {
  const {data} = await get(`${GRAPHQL_SERVER}?query=${query}`)
  return data
}

export async function graphQLMutation(mutation, variables) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': getAuthIDToken()
  }
  const {data} = await post(GRAPHQL_SERVER, {variables}, {headers})
  return data
}