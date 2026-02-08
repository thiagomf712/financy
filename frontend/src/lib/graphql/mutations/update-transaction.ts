import { gql } from '@apollo/client'
import type {
  TransactionData,
  TransactionSaveInput,
} from '../types/transaction'

export type UpdateTransactionData = { updateTransaction: TransactionData }

export type UpdateTransactionInput = {
  id: string
  data: TransactionSaveInput
}

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction($id: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $id, data: $data) {
      id
      description
      date
      type
      amount
      category {
        id
        title
        iconName
        colorHex
      }
    }
  }
`
