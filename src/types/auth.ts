import type { User } from './user'

export type UserRole = 'TEACHER' | 'STUDENT' | 'PARENT'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
