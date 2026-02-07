import { Link, useLocation } from 'react-router-dom'
import logo from '@/assets/logo.svg'
import { GetUserNameLetters } from '@/lib/utils'
import { useAuthStore } from '../stores/auth'
import { Button } from './ui/button'

export function Header() {
  const { user, isAuthenticated } = useAuthStore()
  const location = useLocation()
  const isDashboardPage = location.pathname === '/'
  const isTransactionsPage = location.pathname === '/transactions'
  const isCategoriesPage = location.pathname === '/categories'
  const userLetters = GetUserNameLetters(user?.name || 'U')

  if (!isAuthenticated) {
    return <></>
  }

  return (
    <div className="w-full px-12 py-6 border-b border-gray-200 bg-white">
      <header className="flex justify-between items-center w-full">
        <div>
          <img src={logo} alt="Financy Logo" />
        </div>

        <nav className="flex items-center gap-5">
          <LinkButton to="/" isActive={isDashboardPage} name="Dashboard" />
          <LinkButton
            to="/transactions"
            isActive={isTransactionsPage}
            name="Transações"
          />
          <LinkButton
            to="/categories"
            isActive={isCategoriesPage}
            name="Categorias"
          />
        </nav>

        <Button
          className="size-9 bg-gray-300 rounded-full hover:bg-gray-400"
          variant="ghost"
          size="icon"
          asChild
        >
          <Link to="/profile">{userLetters}</Link>
        </Button>
      </header>
    </div>
  )
}

type LinkButtonProps = { to: string; isActive: boolean; name: string }
function LinkButton({ isActive, name, to }: LinkButtonProps) {
  return (
    <Button
      variant="link"
      asChild
      size="sm"
      className={
        isActive ? 'font-semibold text-brand-base' : 'text-gray-600 font-normal'
      }
    >
      <Link to={to}>{name}</Link>
    </Button>
  )
}
