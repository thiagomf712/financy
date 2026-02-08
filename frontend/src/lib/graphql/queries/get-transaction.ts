import { gql } from '@apollo/client'
import type { TransactionData } from '../types/transaction'

export type GetTransactionData = { getTransaction: TransactionData }

export type GetTransactionInput = {
  id: string
}

export const GET_TRANSACTION_QUERY = gql`
  query GetTransaction($id: String!) {
    getTransaction(id: $id) {
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
