import type { TransactionType } from './transaction'

export type CategoryData = {
  id: string
  title: string
  description?: string | null
  colorHex: string
  iconName: string
}

export type CategoryNameData = Pick<CategoryData, 'id' | 'title'>

export type CategoryDataWithTransactions = CategoryData & {
  transactions: Array<{
    id: string
    amount: number
    type: TransactionType
  }>
}

export type CategorySaveInput = {
  colorHex: string
  description?: string | null
  iconName: string
  title: string
}
