import { gql } from '@apollo/client'

export type DeleteCategoryData = { deleteCategory: boolean }

export type DeleteCategoryInput = {
  id: string
}

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`
