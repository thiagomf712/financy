import { useQuery } from '@apollo/client/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  LIST_TRANSACTIONS_QUERY,
  type ListTransactionsData,
  type ListTransactionsInput,
} from '@/lib/graphql/queries/list-transactions'
import { CreateTransactionModal } from './components/CreateModal'
import {
  FilterTransactionForm,
  type TransactionFilterFormData,
} from './components/FilterForm'
import { TransactionsTable } from './components/TransactionsTable'

export function TransactionsPage() {
  const [page, setPage] = useState(0)

  const { data, loading, error, refetch } = useQuery<
    ListTransactionsData,
    ListTransactionsInput
  >(LIST_TRANSACTIONS_QUERY, {
    variables: {
      page: page + 1,
      limit: 10,
    },
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Ocorreu um erro ao carregar as transações')
    }
  }, [error])

  function handleFilter(data: TransactionFilterFormData) {
    refetch({
      page: 1,
      limit: 10,
      search: data.search === '' ? undefined : data.search,
      startDate: data.date?.from.toISOString(),
      endDate: data.date?.to.toISOString(),
      type: data.type === 'ALL' ? undefined : data.type,
      categoryId: data.categoryId === 'none' ? undefined : data.categoryId,
    })
  }

  function handlePageChange(newPage: number) {
    setPage(newPage)
    refetch({
      page: newPage + 1,
      limit: 10,
    })
  }

  const transactions = data?.listTransactions.items || []
  const total = data?.listTransactions.total || 0

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
          <p className="text-gray-600">
            Gerencie todas as suas transações financeiras
          </p>
        </div>

        <CreateTransactionModal onCreate={() => refetch()} />
      </header>

      <FilterTransactionForm onFilter={handleFilter} loading={loading} />

      <TransactionsTable
        loading={loading}
        onPageChange={handlePageChange}
        page={page}
        total={total}
        transactions={transactions}
        onUpdate={() => refetch()}
        onDelete={() => refetch()}
      />
    </div>
  )
}
