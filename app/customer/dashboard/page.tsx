'use client'

import { useRequireAuth } from '@/hooks/useAuth'
import AccountOverview from '@/components/customer/AccountOverview'
import OrderHistory from '@/components/customer/OrderHistory'
import QuickActions from '@/components/customer/QuickActions'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function CustomerDashboard() {
  const { isLoading, authorized, user } = useRequireAuth('customer')

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!authorized) {
    return null // Will redirect automatically
  }

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="text-xl text-gray-600 mt-2">
            Welcome back, {user?.name}!
          </p>
          {user?.company && (
            <p className="text-lg text-indigo-600 mt-1">{user.company}</p>
          )}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AccountOverview />
            <OrderHistory />
          </div>
          
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}