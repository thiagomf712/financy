import { CategoryIcon } from '@/components/CategoryIcon'
import { CategoryTag } from '@/components/CategoryTag'
import type { CategoryDataWithTransactions } from '@/lib/graphql/types/category'
import type { CategoryColorName } from '@/utils/colorMap'
import type { CategoryIconName } from '@/utils/iconMap'
import { DeleteCategoryModal } from './DeleteCategoryModal'
import { UpdateCategoryModal } from './UpdateCategoryModal'

type CategoryCardProps = {
  category: CategoryDataWithTransactions
  onUpdate(): void
  onDelete(): void
}

export function CategoryCard({
  category,
  onUpdate,
  onDelete,
}: CategoryCardProps) {
  const totalTransactions = category.transactions.length
  const colorName = category.colorHex as CategoryColorName
  const iconName = category.iconName as CategoryIconName

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <CategoryIcon color={colorName} iconName={iconName} />

        <div className="flex items-center gap-2">
          <DeleteCategoryModal id={category.id} onDelete={onDelete} />

          <UpdateCategoryModal id={category.id} onUpdate={onUpdate} />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-gray-800">{category.title}</h3>
        <p className="text-sm text-gray-600">{category.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <CategoryTag color={colorName} title={category.title} />

        <span className="text-sm text-gray-600">
          {totalTransactions} {totalTransactions === 1 ? 'item' : 'itens'}
        </span>
      </div>
    </div>
  )
}
