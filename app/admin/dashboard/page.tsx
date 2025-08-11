'use client'

import { useRequireAuth } from '@/hooks/useAuth'
import StatsOverview from '@/components/admin/StatsOverview'
import CustomerManagement from '@/components/admin/CustomerManagement'
import SupportTickets from '@/components/admin/SupportTickets'
import SiteManagement from '@/components/admin/SiteManagement'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function AdminDashboard() {
  const { isLoading, authorized, user } = useRequireAuth(['admin', 'employee'])

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
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-xl text-gray-600 mt-2">
            Welcome back, {user?.name}! 
            <span className="capitalize ml-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
              {user?.role}
            </span>
          </p>
          {user?.department && (
            <p className="text-lg text-gray-600 mt-1">{user.department} Department</p>
          )}
        </div>
        
        <div className="space-y-8">
          <StatsOverview />
          
          <div className="grid lg:grid-cols-2 gap-8">
            <CustomerManagement />
            <SupportTickets />
          </div>
          
          <SiteManagement />
        </div>
      </div>
    </div>
  )
}