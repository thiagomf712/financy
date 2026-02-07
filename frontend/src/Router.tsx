import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/Auth/page'
import { CategoriesPage } from './pages/Categories/page'
import { DashboardPage } from './pages/Dashboard/page'
import { ProfilePage } from './pages/Profile/page'
import { RegisterPage } from './pages/Register/page'
import { TransactionsPage } from './pages/Transactions/page'
import { useAuthStore } from './stores/auth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()

  return isAuthenticated ? children : <Navigate to="/auth" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()

  return !isAuthenticated ? children : <Navigate to="/" replace />
}

export function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
