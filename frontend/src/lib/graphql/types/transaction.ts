export const transactionTypeEnum = {
  EXPENSE: 'EXPENSE',
  INCOME: 'INCOME',
} as const

export type TransactionType = keyof typeof transactionTypeEnum

export const transactionTypeList = Object.values(
  transactionTypeEnum
) as TransactionType[]

export type TransactionSaveInput = {
  amount: number
  categoryId: string
  date: string
  description: string
  type: TransactionType
}

export type TransactionData = {
  id: string
  amount: number
  date: string
  description: string
  type: TransactionType
  category: {
    id: string
    title: string
    colorHex: string
    iconName: string
  }
}
