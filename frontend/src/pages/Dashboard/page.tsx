import { CategoriesTable } from './components/CategoriesTable'
import { RecentTransactionsTable } from './components/RecentTransactionsTable'
import { Summary } from './components/Summary'

export function DashboardPage() {
  return (
    <div>
      <Summary />

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <RecentTransactionsTable />
        </div>

        <div>
          <CategoriesTable />
        </div>
      </div>
    </div>
  )
}
