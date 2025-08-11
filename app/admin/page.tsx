'use client'

import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function AdminPage() {
  const { isAuthenticated, isLoading, isEmployee, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/signin?callbackUrl=/admin')
      } else if (isEmployee || isAdmin) {
        router.push('/admin/dashboard')
      } else {
        router.push('/unauthorized')
      }
    }
  }, [isAuthenticated, isLoading, isEmployee, isAdmin, router])

  return <LoadingSpinner text="Redirecting..." />
}