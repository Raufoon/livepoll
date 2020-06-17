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