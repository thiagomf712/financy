import { gql } from '@apollo/client'
import type { CategoryData, CategorySaveInput } from '../types/category'

export type UpdateCategoryData = { updateCategory: CategoryData }

export type UpdateCategoryInput = {
  id: string
  data: CategorySaveInput
}

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: String!, $data: UpdateCategoryInput!) {
    updateCategory(id: $id, data: $data) {
      id
      iconName
      colorHex
      description
      title
    }
  }
`
