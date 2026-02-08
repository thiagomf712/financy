import { useLazyQuery, useMutation } from '@apollo/client/react'
import { Loader2Icon, SquarePenIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  UPDATE_CATEGORY_MUTATION,
  type UpdateCategoryData,
  type UpdateCategoryInput,
} from '@/lib/graphql/mutations/update-category'
import {
  GET_CATEGORY_QUERY,
  type GetCategoryData,
  type GetCategoryInput,
} from '@/lib/graphql/queries/get-category'
import type { CategoryColorName } from '@/utils/colorMap'
import type { CategoryIconName } from '@/utils/iconMap'
import { type CategoryFormData, FormCategory } from './FormCategory'

type UpdateCategoryFormProps = {
  id: string
  onUpdate(): void
}

export function UpdateCategoryModal({ id, onUpdate }: UpdateCategoryFormProps) {
  const [open, setOpen] = useState(false)

  const [getCategory, { data: categoryData, loading: getLoading, error }] =
    useLazyQuery<GetCategoryData, GetCategoryInput>(GET_CATEGORY_QUERY)

  const [updateCategory, { loading: updateLoading }] = useMutation<
    UpdateCategoryData,
    UpdateCategoryInput
  >(UPDATE_CATEGORY_MUTATION, {
    onCompleted() {
      toast.success('Categoria atualizada com sucesso!')
      setOpen(false)
      onUpdate()
    },
    onError(error) {
      toast.error(error.message || 'Ocorreu um erro ao atualizar a categoria')
    },
  })

  function handleOpenChange(open: boolean) {
    if (open) {
      getCategory({ variables: { id } })
    }

    setOpen(open)
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Ocorreu um erro ao carregar a categoria')
    }
  }, [error])

  function handleSubmit(data: CategoryFormData) {
    updateCategory({
      variables: {
        id: id,
        data: {
          title: data.title,
          description: data.description,
          colorHex: data.color,
          iconName: data.icon,
        },
      },
    })
  }

  const { getCategory: category } = categoryData || {}

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" disabled={getLoading}>
          {getLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SquarePenIcon />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar categoria</DialogTitle>
          <DialogDescription>
            Atualize as informações da categoria para organizar melhor suas
            transações.
          </DialogDescription>
        </DialogHeader>
        {getLoading && (
          <div className="flex items-center justify-center py-10">
            <Loader2Icon className="animate-spin size-10" />
          </div>
        )}
        {category && (
          <div>
            <FormCategory
              onSubmit={handleSubmit}
              loading={updateLoading}
              defaultValues={{
                icon: category.iconName as CategoryIconName,
                color: category.colorHex as CategoryColorName,
                title: category.title,
                description: category.description || undefined,
              }}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
