import { useQuery } from '@apollo/client/react'
import { ChevronRightIcon, Loader2Icon } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { CategoryTag } from '@/components/CategoryTag'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  LIST_CATEGORIES_QUERY,
  type ListCategoriesData,
} from '@/lib/graphql/queries/list-categories'
import type { CategoryDataWithTransactions } from '@/lib/graphql/types/category'
import { transactionTypeEnum } from '@/lib/graphql/types/transaction'
import type { CategoryColorName } from '@/utils/colorMap'

export function CategoriesTable() {
  const { data, loading, error } = useQuery<ListCategoriesData>(
    LIST_CATEGORIES_QUERY,
    {
      variables: {
        page: 1,
        limit: 5,
      },
    }
  )

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Ocorreu um erro ao carregar as categorias')
    }
  }, [error])

  const categories = data?.listCategories || []

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
            Categorias
          </TableHead>
          <TableHead className="w-20" align="right">
            <div>
              <Button
                variant="link"
                size="sm"
                asChild
                className="text-brand-base"
              >
                <Link to="/categories">
                  Gerenciar <ChevronRightIcon />
                </Link>
              </Button>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map(category => (
          <CategoryRow key={category.id} category={category} />
        ))}
      </TableBody>
    </Table>
  )
}

type CategoryRowProps = {
  category: CategoryDataWithTransactions
}
function CategoryRow({ category }: CategoryRowProps) {
  const categoryColor = category.colorHex as CategoryColorName

  const transactionsCount = category.transactions.length

  const totalAmountFormatted = useMemo(() => {
    var total = category.transactions.reduce((sum, transaction) => {
      return (
        sum +
        transaction.amount *
          (transaction.type === transactionTypeEnum.INCOME ? 1 : -1)
      )
    }, 0)

    return `${total >= 0 ? '+' : '-'} ${Math.abs(total).toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
      }
    )}`
  }, [category.transactions])

  return (
    <TableRow className="border-transparent">
      <TableCell align="left" className="py-2.5">
        <CategoryTag color={categoryColor} title={category.title} />
      </TableCell>
      <TableCell align="right" className="text-gray-600 text-right px-2 py-2.5">
        <span>
          {transactionsCount} {transactionsCount === 1 ? 'item' : 'itens'}
        </span>
      </TableCell>
      <TableCell
        align="right"
        className="text-gray-800 font-semibold pl-2 py-2.5"
      >
        {totalAmountFormatted}
      </TableCell>
    </TableRow>
  )
}
