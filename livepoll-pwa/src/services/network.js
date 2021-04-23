import { get, post } from 'axios'
import { getAuthIDToken } from './auth'

// const DEV_SERVER = 'http://localhost:5000/lllivepolll/us-central1/server'
const SERVER = 'http://localhost:9000'

export async function graphQlSecureQuery(query) {
  const idToken = await getAuthIDToken()
  const headers = {
    Authorization: idToken,
  }
  return fetch(`${SERVER}/graphql?query=${query}`, {
    headers,
  }).then((response) => response.json())
  //return get(`${SERVER}/graphql?query=${query}`, {headers}).then(response => response.data)
}

export function graphQlQuery(query) {
  return fetch(`${SERVER}/graphql?query=${query}`).then((response) =>
    response.json()
  )
  //return get(`${SERVER}/graphql?query=${query}`).then(response => response.data)
}

export async function graphQlMutation(query, variables) {
  const idToken = await getAuthIDToken()
  const headers = {
    Authorization: idToken,
  }
  return post(`${SERVER}/graphql`, { query, variables }, { headers }).then(
    (response) => response.data
  )
}

export async function doSecurePostRequest(path, data) {
  const idToken = await getAuthIDToken()
  const headers = {
    Authorization: idToken,
  }
  return post(`${SERVER}/${path}`, data, { headers }).then(
    (response) => response.data
  )
}
