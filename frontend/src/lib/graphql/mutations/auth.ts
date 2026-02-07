import { gql } from '@apollo/client'

export type LoginResponse = {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export type LoginMutationData = { login: LoginResponse }

export type LoginInput = {
  email: string
  password: string
}

export type LoginMutationInput = {
  data: LoginInput
}

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
        email
        name
      }
    }
  }
`
