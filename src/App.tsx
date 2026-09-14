import { useState, useCallback } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import ErrorBoundary from './components/common/ErrorBoundary'
import type { UserRole, User } from './types/user'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = useCallback((role: UserRole) => {
    setIsAuthenticated(true)
    setUserRole(role)
    setUser({
      id: '1',
      email: `${role.toLowerCase()}@educonnect.com`,
      name: role === 'TEACHER' ? 'Sinta' : role === 'STUDENT' ? 'Andi' : 'Budi',
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }, [])

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false)
    setUserRole(null)
    setUser(null)
  }, [])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
