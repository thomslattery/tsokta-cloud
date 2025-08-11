'use client'

import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function CustomerPage() {
  const { isAuthenticated, isLoading, isCustomer } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/signin?callbackUrl=/customer')
      } else if (isCustomer) {
        router.push('/customer/dashboard')
      } else {
        router.push('/unauthorized')
      }
    }
  }, [isAuthenticated, isLoading, isCustomer, router])

  return <LoadingSpinner text="Redirecting..." />
}