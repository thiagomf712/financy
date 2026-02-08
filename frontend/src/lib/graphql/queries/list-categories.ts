import { gql } from '@apollo/client'
import type {
  CategoryDataWithTransactions,
  CategoryNameData,
} from '../types/category'

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

export type ListCategoriesNameData = {
  listCategories: CategoryNameData[]
}

export const LIST_CATEGORIES_NAME = gql`
  query ListCategoriesName {
    listCategories {
      id
      title
    }
  }
`
