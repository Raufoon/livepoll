import {get, post} from 'axios'
import {getAuthIDToken} from './auth'

const DEV_SERVER = 'http://localhost:5000/lllivepolll/us-central1/server'
const SERVER = 'http://us-central1-lllivepolll.cloudfunctions.net/server'

export function graphQlQuery(query) {
  return get(`${SERVER}/graphql?query=${query}`).then(response => response.data)
}

export async function graphQlMutation(query, variables) {
  const idToken = await getAuthIDToken()
  const headers = {
    'Authorization': idToken
  }
  return post(`${SERVER}/graphql`, {query, variables}, {headers})
    .then(response => response.data)
}

export async function doSecurePostRequest(path, data) {
  const idToken = await getAuthIDToken()
  const headers = {
    'Authorization': idToken
  }
  return post(`${SERVER}/upload/avatar`, data, {headers})
    .then(response => response.data)
}
