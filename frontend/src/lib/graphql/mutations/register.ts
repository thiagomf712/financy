import { gql } from '@apollo/client'

export type RegisterResponse = {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export type RegisterMutationData = { register: RegisterResponse }

export type RegisterInput = {
  name: string
  email: string
  password: string
}

export type RegisterMutationInput = {
  data: RegisterInput
}

export const REGISTER_MUTATION = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`
