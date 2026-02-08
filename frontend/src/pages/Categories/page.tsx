import { useQuery } from '@apollo/client/react'
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import {
  LIST_CATEGORIES_QUERY,
  type ListCategoriesData,
} from '@/lib/graphql/queries/list-categories'
import { CategoryCard } from './components/CategoryCard'
import { CreateCategoryModal } from './components/CreateCategoryModal'
import { CategorySummary } from './components/Summary'

export function CategoriesPage() {
  const { data, loading, error, refetch } = useQuery<ListCategoriesData>(
    LIST_CATEGORIES_QUERY
  )

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Ocorreu um erro ao carregar as categorias')
    }
  }, [error])

  const categories = data?.listCategories || []

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
          <p className="text-gray-600">
            Organize suas transações por categorias
          </p>
        </div>

        <CreateCategoryModal onCreate={() => refetch()} />
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2Icon className="animate-spin size-10" />
        </div>
      ) : (
        <>
          <CategorySummary categories={categories} />

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onUpdate={() => refetch()}
                onDelete={() => refetch()}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
