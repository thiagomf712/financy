import { gql } from '@apollo/client'
import type { CategoryData, CategorySaveInput } from '../types/category'

export type CreateCategoryData = { createCategory: CategoryData }

export type CreateCategoryInput = {
  data: CategorySaveInput
}

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      iconName
      colorHex
      description
      title
    }
  }
`
