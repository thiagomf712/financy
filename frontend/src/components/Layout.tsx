import { Toaster } from '@/components/ui/sonner'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto p-12">{children}</main>

      <Toaster />
    </div>
  )
}
