'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export interface ExtendedUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
  company?: string
  department?: string
  oktaId?: string
}

interface UseAuthReturn {
  user: ExtendedUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (redirectTo?: string) => Promise<void>
  logout: (redirectTo?: string) => Promise<void>
  hasRole: (role: string | string[]) => boolean
  isAdmin: boolean
  isEmployee: boolean
  isCustomer: boolean
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'
  const user = session?.user as ExtendedUser | null

  // Login function that redirects to Okta
  const login = useCallback(async (redirectTo?: string) => {
    const callbackUrl = redirectTo || window.location.pathname
    await signIn('okta', { callbackUrl })
  }, [])

  // Logout function
  const logout = useCallback(async (redirectTo?: string) => {
    const callbackUrl = redirectTo || '/'
    await signOut({ callbackUrl })
  }, [])

  // Check if user has specific role(s)
  const hasRole = useCallback((role: string | string[]): boolean => {
    if (!user?.role) return false
    
    if (Array.isArray(role)) {
      return role.includes(user.role)
    }
    
    return user.role === role
  }, [user?.role])

  // Convenience role checkers
  const isAdmin = hasRole('admin')
  const isEmployee = hasRole(['admin', 'employee'])
  const isCustomer = hasRole('customer')

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    hasRole,
    isAdmin,
    isEmployee,
    isCustomer,
  }
}

// Hook for role-based route protection
export function useRequireAuth(allowedRoles?: string | string[]) {
  const { user, isLoading, isAuthenticated, hasRole } = useAuth()
  const router = useRouter()

  if (isLoading) return { isLoading: true }

  if (!isAuthenticated) {
    router.push('/auth/signin')
    return { isLoading: false, authorized: false }
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    router.push('/unauthorized')
    return { isLoading: false, authorized: false }
  }

  return { 
    isLoading: false, 
    authorized: true, 
    user 
  }
}

// Hook for conditional role-based rendering
export function useRoleAccess() {
  const { hasRole } = useAuth()

  return {
    canAccessAdmin: hasRole('admin'),
    canAccessEmployee: hasRole(['admin', 'employee']),
    canAccessCustomer: hasRole('customer'),
    hasRole,
  }
}