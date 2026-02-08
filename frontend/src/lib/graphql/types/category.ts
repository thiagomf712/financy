export type CategoryData = {
  id: string
  title: string
  description?: string | null
  colorHex: string
  iconName: string
}

export type CategoryDataWithTransactions = CategoryData & {
  transactions: Array<{
    id: string
    amount: number
  }>
}

export type CategorySaveInput = {
  colorHex: string
  description?: string | null
  iconName: string
  title: string
}
