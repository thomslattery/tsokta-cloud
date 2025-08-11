'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLoginPage() {
  const router = useRouter()
  const { isAuthenticated, isEmployee, isAdmin } = useAuth()

  useEffect(() => {
    if (isAuthenticated && (isEmployee || isAdmin)) {
      router.push('/admin/dashboard')
    } else {
      // Redirect to main sign-in page
      router.push('/auth/signin?callbackUrl=/admin/dashboard')
    }
  }, [isAuthenticated, isEmployee, isAdmin, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to admin sign in...</p>
      </div>
    </div>
  )
}