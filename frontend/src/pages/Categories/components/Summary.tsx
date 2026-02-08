import { ArrowUpDownIcon, TagIcon, UtensilsIcon } from 'lucide-react'
import { type ElementType, useMemo } from 'react'
import type { CategoryDataWithTransactions } from '@/lib/graphql/types/category'

type CategorySummaryProps = {
  categories: CategoryDataWithTransactions[]
}

export function CategorySummary({ categories }: CategorySummaryProps) {
  const [totalCategories, totalTransactions, mostUsed] = useMemo(() => {
    const totalCategories = categories.length

    const totalTransactions = categories.reduce(
      (sum, category) => sum + category.transactions.length,
      0
    )

    const mostUsed = categories.reduce(
      (mostUsedCategory, category) => {
        if (
          !mostUsedCategory ||
          category.transactions.length > mostUsedCategory.transactions.length
        ) {
          return category
        }

        return mostUsedCategory
      },
      null as CategoryDataWithTransactions | null
    )

    return [totalCategories, totalTransactions, mostUsed]
  }, [categories])

  return (
    <div className="grid grid-cols-3 gap-x-6 items-center">
      <SummaryCard
        Icon={TagIcon}
        title="Total de categorias"
        value={totalCategories}
      />

      <SummaryCard
        Icon={ArrowUpDownIcon}
        title="Total de transações"
        value={totalTransactions}
      />

      <SummaryCard
        Icon={UtensilsIcon}
        title="Categoria mais utilizada"
        value={mostUsed?.title || '-'}
      />
    </div>
  )
}

type SummaryCardProps = {
  Icon: ElementType
  title: string
  value: string | number
}
function SummaryCard({ Icon, title, value }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-4 bg-white p-6 rounded-lg">
      <Icon className="size-8 text-gray-700" />
      <div className="space-y-2">
        <p className="text-[28px] font-bold text-gray-800">{value}</p>
        <p className="font-medium text-gray-500 uppercase">{title}</p>
      </div>
    </div>
  )
}
