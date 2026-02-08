import { useQuery } from '@apollo/client/react'
import { format } from 'date-fns'
import {
  ChevronRightIcon,
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  Loader2Icon,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { CategoryIcon } from '@/components/CategoryIcon'
import { CategoryTag } from '@/components/CategoryTag'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  LIST_TRANSACTIONS_QUERY,
  type ListTransactionsData,
  type ListTransactionsInput,
} from '@/lib/graphql/queries/list-transactions'
import {
  type TransactionData,
  transactionTypeEnum,
} from '@/lib/graphql/types/transaction'
import { CreateTransactionModal } from '@/pages/Transactions/components/CreateModal'
import type { CategoryColorName } from '@/utils/colorMap'
import type { CategoryIconName } from '@/utils/iconMap'

export function RecentTransactionsTable() {
  const { data, loading, error, refetch } = useQuery<
    ListTransactionsData,
    ListTransactionsInput
  >(LIST_TRANSACTIONS_QUERY, {
    variables: {
      page: 1,
      limit: 5,
    },
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Ocorreu um erro ao carregar as transações')
    }
  }, [error])

  const transactions = data?.listTransactions.items || []

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2} className="uppercase">
            Transações recentes
          </TableHead>
          <TableHead className="w-25" align="right">
            <div>
              <Button
                variant="link"
                size="sm"
                asChild
                className="text-brand-base"
              >
                <Link to="/transactions">
                  Ver todas <ChevronRightIcon />
                </Link>
              </Button>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map(transaction => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} align="center">
            <CreateTransactionModal
              onCreate={() => refetch()}
              triggerProps={{
                variant: 'link',
                className: 'text-brand-base',
              }}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

type TransactionRowProps = {
  transaction: TransactionData
}
function TransactionRow({ transaction }: TransactionRowProps) {
  const formattedDate = format(new Date(transaction.date), 'dd/MM/yy')
  const categoryColor = transaction.category
    ? (transaction.category.colorHex as CategoryColorName)
    : 'blue'
  const categoryIcon = transaction.category
    ? (transaction.category.iconName as CategoryIconName)
    : 'briefcase-business'

  const amountFormatted = `${transaction.type === transactionTypeEnum.INCOME ? '+' : '-'} ${transaction.amount.toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
    }
  )}`

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-4">
          <CategoryIcon color={categoryColor} iconName={categoryIcon} />

          <div>
            <p className="text-gray-800 font-medium">
              {transaction.description}
            </p>
            <p className="text-gray-600">{formattedDate}</p>
          </div>
        </div>
      </TableCell>
      <TableCell align="center">
        <CategoryTag color={categoryColor} title={transaction.category.title} />
      </TableCell>
      <TableCell align="right" className="w-25">
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-semibold ">
            {amountFormatted}
          </span>

          {transaction.type === transactionTypeEnum.INCOME ? (
            <CircleArrowUpIcon className="text-success size-4" />
          ) : (
            <CircleArrowDownIcon className="text-danger size-4" />
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}
