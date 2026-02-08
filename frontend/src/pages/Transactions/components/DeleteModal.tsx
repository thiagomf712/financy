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
  DELETE_TRANSACTION_MUTATION,
  type DeleteTransactionData,
  type DeleteTransactionInput,
} from '@/lib/graphql/mutations/delete-transaction'

type DeleteTransactionFormProps = {
  id: string
  onDelete(): void
}

export function DeleteTransactionModal({
  id,
  onDelete,
}: DeleteTransactionFormProps) {
  const [open, setOpen] = useState(false)

  const [deleteTransaction, { loading }] = useMutation<
    DeleteTransactionData,
    DeleteTransactionInput
  >(DELETE_TRANSACTION_MUTATION, {
    onCompleted() {
      toast.success('Transação deletada com sucesso!')
      setOpen(false)
      onDelete()
    },
    onError(error) {
      toast.error(error.message || 'Ocorreu um erro ao deletar a transação')
    },
  })

  function handleDelete() {
    deleteTransaction({
      variables: {
        id: id,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" disabled={loading}>
          <TrashIcon className="text-danger" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar transação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar esta transação?
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
