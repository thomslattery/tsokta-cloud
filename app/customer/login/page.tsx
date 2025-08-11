'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function CustomerLoginPage() {
  const router = useRouter()
  const { isAuthenticated, isCustomer } = useAuth()

  useEffect(() => {
    if (isAuthenticated && isCustomer) {
      router.push('/customer/dashboard')
    } else {
      // Redirect to main sign-in page
      router.push('/auth/signin?callbackUrl=/customer/dashboard')
    }
  }, [isAuthenticated, isCustomer, router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to sign in...</p>
      </div>
    </div>
  )
}