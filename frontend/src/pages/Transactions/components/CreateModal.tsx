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
  CREATE_TRANSACTION_MUTATION,
  type CreateTransactionData,
  type CreateTransactionInput,
} from '@/lib/graphql/mutations/create-transaction'
import { LIST_CATEGORIES_QUERY } from '@/lib/graphql/queries/list-categories'
import { GET_TRANSACTIONS_SUMMARY_QUERY } from '@/lib/graphql/queries/list-transactions'
import { FormTransaction, type TransactionFormData } from './FormTransaction'

type CreateTransactionFormProps = {
  onCreate(): void
  triggerProps?: React.ComponentProps<typeof Button>
}

export function CreateTransactionModal({
  onCreate,
  triggerProps,
}: CreateTransactionFormProps) {
  const [open, setOpen] = useState(false)

  const [createTransaction, { loading }] = useMutation<
    CreateTransactionData,
    CreateTransactionInput
  >(CREATE_TRANSACTION_MUTATION, {
    refetchQueries: [
      { query: LIST_CATEGORIES_QUERY },
      { query: GET_TRANSACTIONS_SUMMARY_QUERY },
    ],
    onCompleted() {
      toast.success('Transação criada com sucesso!')
      setOpen(false)
      onCreate()
    },
    onError(error) {
      toast.error(error.message || 'Ocorreu um erro ao criar a transação')
    },
  })

  function handleSubmit(data: TransactionFormData) {
    createTransaction({
      variables: {
        data: {
          amount: Number(data.amount.replaceAll('.', '').replace(',', '.')),
          categoryId: data.categoryId,
          date: data.date.toISOString(),
          description: data.description,
          type: data.type,
        },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" {...triggerProps}>
          <PlusIcon /> Nova transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </DialogHeader>
        <div>
          <FormTransaction onSubmit={handleSubmit} loading={loading} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
