import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apolloClient } from '@/lib/graphql/apollo'
import {
  LOGIN_MUTATION,
  type LoginInput,
  type LoginMutationData,
  type LoginMutationInput,
} from '@/lib/graphql/mutations/auth'
import {
  REGISTER_MUTATION,
  type RegisterInput,
  type RegisterMutationData,
  type RegisterMutationInput,
} from '@/lib/graphql/mutations/register'
import {
  UPDATE_USER_MUTATION,
  type UpdateUserInput,
  type UpdateUserMutationData,
  type UpdateUserMutationInput,
} from '@/lib/graphql/mutations/update-user'

export type User = {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signup: (data: RegisterInput) => Promise<boolean>
  login: (data: LoginInput) => Promise<boolean>
  updateProfile: (data: UpdateUserInput) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (input: LoginInput) => {
        const { data } = await apolloClient.mutate<
          LoginMutationData,
          LoginMutationInput
        >({
          mutation: LOGIN_MUTATION,
          variables: {
            data: {
              email: input.email,
              password: input.password,
            },
          },
        })

        if (data?.login) {
          const { user, token } = data.login

          set({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            token,
            isAuthenticated: true,
          })

          return true
        }

        return false
      },
      signup: async (input: RegisterInput) => {
        const { data } = await apolloClient.mutate<
          RegisterMutationData,
          RegisterMutationInput
        >({
          mutation: REGISTER_MUTATION,
          variables: {
            data: {
              name: input.name,
              email: input.email,
              password: input.password,
            },
          },
        })

        if (data?.register) {
          const { token, user } = data.register

          set({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            token,
            isAuthenticated: true,
          })

          return true
        }

        return false
      },
      updateProfile: async (input: UpdateUserInput) => {
        const { data } = await apolloClient.mutate<
          UpdateUserMutationData,
          UpdateUserMutationInput
        >({
          mutation: UPDATE_USER_MUTATION,
          variables: {
            data: {
              name: input.name,
            },
          },
        })

        if (data?.updateProfile) {
          const { name } = data.updateProfile

          set({
            user: {
              ...useAuthStore.getState().user,
              name,
            } as User,
          })

          return true
        }

        return false
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })

        apolloClient.clearStore()
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
