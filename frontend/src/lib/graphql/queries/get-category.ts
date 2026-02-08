import { gql } from '@apollo/client'
import type { CategoryData } from '../types/category'

export type GetCategoryData = { getCategory: CategoryData }

export type GetCategoryInput = {
  id: string
}

export const GET_CATEGORY_QUERY = gql`
  query GetCategory($id: String!) {
    getCategory(id: $id) {
      id
      iconName
      colorHex
      description
      title
    }
  }
`
