import { gql } from '@apollo/client'
import type {
  TransactionData,
  TransactionSaveInput,
} from '../types/transaction'

export type CreateTransactionData = { createTransaction: TransactionData }

export type CreateTransactionInput = {
  data: TransactionSaveInput
}

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
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
