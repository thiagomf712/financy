import { gql } from '@apollo/client'

export type UpdateUserResponse = {
  name: string
}

export type UpdateUserMutationData = { updateProfile: UpdateUserResponse }

export type UpdateUserInput = {
  name: string
}

export type UpdateUserMutationInput = {
  data: UpdateUserInput
}

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateProfile($data: UpdateUserInput!) {
    updateProfile(data: $data) {
      name
    }
  }
`
