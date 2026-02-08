import { gql } from '@apollo/client'

export type DeleteTransactionData = { deleteTransaction: boolean }

export type DeleteTransactionInput = {
  id: string
}

export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`
