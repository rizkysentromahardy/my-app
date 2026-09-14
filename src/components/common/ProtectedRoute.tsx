import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { UserRole } from '../../types/user'

interface ProtectedRouteProps {
  children: ReactNode
  isAuthenticated: boolean
  userRole: UserRole | null
  allowedRoles: UserRole[]
}

export default function ProtectedRoute({
  children,
  isAuthenticated,
  userRole,
  allowedRoles,
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = `/${userRole.toLowerCase()}`
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}
