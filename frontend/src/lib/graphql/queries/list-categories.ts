import { gql } from '@apollo/client'
import type { CategoryDataWithTransactions } from '../types/category'

export type ListCategoriesData = {
  listCategories: CategoryDataWithTransactions[]
}

export const LIST_CATEGORIES_QUERY = gql`
  query ListCategories {
    listCategories {
      id
      iconName
      colorHex
      description
      title
      transactions {
        id,
        amount
      }
    }
  }
`
