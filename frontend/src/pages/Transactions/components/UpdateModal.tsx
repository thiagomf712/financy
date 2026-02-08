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
  UPDATE_TRANSACTION_MUTATION,
  type UpdateTransactionData,
  type UpdateTransactionInput,
} from '@/lib/graphql/mutations/update-transaction'
import {
  GET_TRANSACTION_QUERY,
  type GetTransactionData,
  type GetTransactionInput,
} from '@/lib/graphql/queries/get-transaction'
import { LIST_CATEGORIES_QUERY } from '@/lib/graphql/queries/list-categories'
import { GET_TRANSACTIONS_SUMMARY_QUERY } from '@/lib/graphql/queries/list-transactions'
import { formatMoneyInput } from '@/utils/formatMoney'
import { FormTransaction, type TransactionFormData } from './FormTransaction'

type UpdateTransactionFormProps = {
  id: string
  onUpdate(): void
}

export function UpdateTransactionModal({
  id,
  onUpdate,
}: UpdateTransactionFormProps) {
  const [open, setOpen] = useState(false)

  const [
    getTransaction,
    { data: transactionData, loading: getLoading, error },
  ] = useLazyQuery<GetTransactionData, GetTransactionInput>(
    GET_TRANSACTION_QUERY
  )

  const [updateTransaction, { loading: updateLoading }] = useMutation<
    UpdateTransactionData,
    UpdateTransactionInput
  >(UPDATE_TRANSACTION_MUTATION, {
    refetchQueries: [
      { query: LIST_CATEGORIES_QUERY },
      { query: GET_TRANSACTIONS_SUMMARY_QUERY },
    ],
    onCompleted() {
      toast.success('Transação atualizada com sucesso!')
      setOpen(false)
      onUpdate()
    },
    onError(error) {
      toast.error(error.message || 'Ocorreu um erro ao atualizar a transação')
    },
  })

  function handleOpenChange(open: boolean) {
    if (open) {
      getTransaction({ variables: { id } })
    }

    setOpen(open)
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Ocorreu um erro ao carregar a transação')
    }
  }, [error])

  function handleSubmit(data: TransactionFormData) {
    updateTransaction({
      variables: {
        id: id,
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

  const { getTransaction: transaction } = transactionData || {}

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
          <DialogTitle>Editar transação</DialogTitle>
          <DialogDescription>
            Atualize as informações da transação para organizar melhor suas
            finanças
          </DialogDescription>
        </DialogHeader>
        {getLoading && (
          <div className="flex items-center justify-center py-10">
            <Loader2Icon className="animate-spin size-10" />
          </div>
        )}
        {transaction && (
          <div>
            <FormTransaction
              onSubmit={handleSubmit}
              loading={updateLoading}
              defaultValues={{
                amount: formatMoneyInput(transaction.amount.toString()),
                categoryId: transaction.category?.id || 'none',
                date: new Date(transaction.date),
                description: transaction.description,
                type: transaction.type,
              }}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
