import { useMutation } from '@apollo/client/react'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DELETE_CATEGORY_MUTATION,
  type DeleteCategoryData,
  type DeleteCategoryInput,
} from '@/lib/graphql/mutations/delete-category'

type DeleteCategoryFormProps = {
  id: string
  onDelete(): void
}

export function DeleteCategoryModal({ id, onDelete }: DeleteCategoryFormProps) {
  const [open, setOpen] = useState(false)

  const [deleteCategory, { loading }] = useMutation<
    DeleteCategoryData,
    DeleteCategoryInput
  >(DELETE_CATEGORY_MUTATION, {
    onCompleted() {
      toast.success('Categoria deletada com sucesso!')
      setOpen(false)
      onDelete()
    },
    onError(error) {
      toast.error(error.message || 'Ocorreu um erro ao deletar a categoria')
    },
  })

  function handleDelete() {
    deleteCategory({
      variables: {
        id: id,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <TrashIcon className="text-danger" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar categoria</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar esta categoria?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button
            className="bg-danger hover:bg-danger/90"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deletando...' : 'Deletar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
