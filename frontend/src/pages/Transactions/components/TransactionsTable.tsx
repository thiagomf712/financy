import { format } from 'date-fns'
import {
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  Loader2Icon,
} from 'lucide-react'
import { useMemo } from 'react'
import { CategoryIcon } from '@/components/CategoryIcon'
import { CategoryTag } from '@/components/CategoryTag'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
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
  type TransactionData,
  transactionTypeEnum,
} from '@/lib/graphql/types/transaction'
import type { CategoryColorName } from '@/utils/colorMap'
import type { CategoryIconName } from '@/utils/iconMap'
import { DeleteTransactionModal } from './DeleteModal'
import { UpdateTransactionModal } from './UpdateModal'

type TransactionsTableProps = {
  loading: boolean
  transactions: TransactionData[]
  page: number
  total: number
  onPageChange: (page: number) => void
  onUpdate(): void
  onDelete(): void
}

export function TransactionsTable({
  loading,
  transactions,
  page,
  total,
  onPageChange,
  onUpdate,
  onDelete,
}: TransactionsTableProps) {
  const paginationText = useMemo(() => {
    const start = page * 10 + 1
    const end = Math.min((page + 1) * 10, total)
    return `${start}-${end} | ${total} resultados`
  }, [page, total])

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
          <TableHead>Descrição</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead className="w-25">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map(transaction => (
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} align="left">
            {paginationText}
          </TableCell>
          <TableCell colSpan={3} align="right">
            <div className="flex items-center">
              <Pagination className="justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => onPageChange(page - 1)}
                      disabled={page === 0}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.ceil(total / 10) }).map(
                    (_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          onClick={() => onPageChange(index)}
                          isActive={index === page}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => onPageChange(page + 1)}
                      disabled={(page + 1) * 10 >= total}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

type TransactionRowProps = {
  transaction: TransactionData
  onUpdate(): void
  onDelete(): void
}
function TransactionRow({
  transaction,
  onUpdate,
  onDelete,
}: TransactionRowProps) {
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

          <span className="text-gray-800 font-medium">
            {transaction.description}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-gray-600">{formattedDate}</TableCell>
      <TableCell>
        <CategoryTag color={categoryColor} title={transaction.category.title} />
      </TableCell>
      <TableCell>
        {transaction.type === transactionTypeEnum.INCOME ? (
          <IncomeTypeTag />
        ) : (
          <ExpenseTypeTag />
        )}
      </TableCell>
      <TableCell align="right" className="text-gray-800 font-semibold">
        {amountFormatted}
      </TableCell>
      <TableCell className="w-25">
        <div className="flex items-center gap-4">
          <UpdateTransactionModal id={transaction.id} onUpdate={onUpdate} />
          <DeleteTransactionModal id={transaction.id} onDelete={onDelete} />
        </div>
      </TableCell>
    </TableRow>
  )
}

function IncomeTypeTag() {
  return (
    <div className="flex items-center gap-2 text-success font-medium">
      <CircleArrowUpIcon className="size-4" />
      Entrada
    </div>
  )
}

function ExpenseTypeTag() {
  return (
    <div className="flex items-center gap-2 text-danger font-medium">
      <CircleArrowDownIcon className="size-4" />
      Saída
    </div>
  )
}
