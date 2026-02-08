import { gql } from '@apollo/client'
import type { TransactionData } from '../types/transaction'

export type ListTransactionsData = {
  listTransactions: {
    total: number
    items: TransactionData[]
  }
}

export type ListTransactionsInput = {
  page: number
  limit: number
  search?: string
  startDate?: string
  endDate?: string
  type?: 'INCOME' | 'EXPENSE'
  categoryId?: string
}

export const LIST_TRANSACTIONS_QUERY = gql`
  query ListTransactions($page: Int!, $limit: Int!, $startDate: DateTimeISO, $endDate: DateTimeISO, $type: TransactionType, $categoryId: String, $search: String) {
    listTransactions(pageNumber: $page, limit: $limit, startDate: $startDate, endDate: $endDate, type: $type, categoryId: $categoryId, search: $search) {
      total
      items {
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
  }
`

export type GetTransactionsSummaryData = {
  getSummary: {
    totalExpense: number
    totalIncome: number
  }
}

export const GET_TRANSACTIONS_SUMMARY_QUERY = gql`
  query GetTransactionsSummary {
    getSummary {
      totalExpense
      totalIncome
    }
  }
`
