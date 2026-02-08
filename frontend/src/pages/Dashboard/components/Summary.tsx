import { useQuery } from '@apollo/client/react'
import {
  CircleArrowDownIcon,
  CircleArrowUpIcon,
  Loader2Icon,
  WalletIcon,
} from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import {
  GET_TRANSACTIONS_SUMMARY_QUERY,
  type GetTransactionsSummaryData,
} from '@/lib/graphql/queries/list-transactions'

export function Summary() {
  const { data, loading, error } = useQuery<GetTransactionsSummaryData>(
    GET_TRANSACTIONS_SUMMARY_QUERY
  )

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Ocorreu um erro ao carregar as categorias')
    }
  }, [error])

  const { totalExpense, totalIncome } =
    data?.getSummary ??
    ({
      totalExpense: 0,
      totalIncome: 0,
    } as GetTransactionsSummaryData['getSummary'])

  const balance = totalIncome - totalExpense

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      <SummaryCard
        title="Saldo total"
        Icon={<WalletIcon className="text-purple-base size-5" />}
        value={balance}
      />
      <SummaryCard
        title="Receitas do mês"
        Icon={<CircleArrowUpIcon className="text-success size-5" />}
        value={totalIncome}
      />
      <SummaryCard
        title="Despesas do mês"
        Icon={<CircleArrowDownIcon className="text-danger size-5" />}
        value={totalExpense}
      />
    </div>
  )
}

type SummaryCardProps = {
  title: string
  Icon: React.ReactNode
  value: number
}
function SummaryCard({ title, Icon, value }: SummaryCardProps) {
  const valueFormatted = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-3">
        {Icon}
        <span className="font-medium text-gray-500 uppercase">{title}</span>
      </div>
      <p className="text-[32px] font-semibold text-gray-800">
        {valueFormatted}
      </p>
    </div>
  )
}
