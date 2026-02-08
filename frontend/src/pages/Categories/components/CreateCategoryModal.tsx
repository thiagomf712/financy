import { useMutation } from '@apollo/client/react'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
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
  CREATE_CATEGORY_MUTATION,
  type CreateCategoryData,
  type CreateCategoryInput,
} from '@/lib/graphql/mutations/create-category'
import { type CategoryFormData, FormCategory } from './FormCategory'

type CreateCategoryFormProps = {
  onCreate(): void
}

export function CreateCategoryModal({ onCreate }: CreateCategoryFormProps) {
  const [open, setOpen] = useState(false)

  const [createCategory, { loading }] = useMutation<
    CreateCategoryData,
    CreateCategoryInput
  >(CREATE_CATEGORY_MUTATION, {
    onCompleted() {
      toast.success('Categoria criada com sucesso!')
      setOpen(false)
      onCreate()
    },
    onError(error) {
      toast.error(error.message || 'Ocorreu um erro ao criar a categoria')
    },
  })

  function handleSubmit(data: CategoryFormData) {
    createCategory({
      variables: {
        data: {
          title: data.title,
          description: data.description,
          colorHex: data.color,
          iconName: data.icon,
        },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon /> Nova categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova categoria</DialogTitle>
          <DialogDescription>
            Crie uma nova categoria para organizar suas transações.
          </DialogDescription>
        </DialogHeader>
        <div>
          <FormCategory onSubmit={handleSubmit} loading={loading} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
