'use client'

import { useAuth } from '@/hooks/useAuth'
import Card from '@/components/ui/Card'

export default function AccountOverview() {
  const { user } = useAuth()

  if (!user) return null

  // Mock data - in a real app this would come from an API
  const deviceCount = 12
  const uptime = 99.8
  const activeAlerts = 2
  const monthlyUsage = 847

  return (
    <Card>
      <h3 className="text-2xl font-bold mb-6">Account Overview</h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h4 className="font-semibold text-indigo-800 mb-2">Active Devices</h4>
          <div className="text-3xl font-bold text-indigo-600">{deviceCount}</div>
          <p className="text-sm text-indigo-600">
            3 TS-Pro 3000, {deviceCount - 3} TS-Compact 1500
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">System Uptime</h4>
          <div className="text-3xl font-bold text-green-600">{uptime}%</div>
          <p className="text-sm text-green-600">Last 30 days</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Active Alerts</h4>
          <div className="text-3xl font-bold text-yellow-600">{activeAlerts}</div>
          <p className="text-sm text-yellow-600">Requires attention</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Monthly Usage</h4>
          <div className="text-3xl font-bold text-blue-600">{monthlyUsage}GB</div>
          <p className="text-sm text-blue-600">Data processed</p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h4 className="font-semibold text-gray-800 mb-4">Account Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Primary Contact</label>
            <p className="text-gray-900">{user.name}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Company</label>
            <p className="text-gray-900">{user.company || 'Not specified'}</p>
            {user.department && (
              <p className="text-gray-600 text-sm">{user.department} Department</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Account Type</label>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
              {user.role}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Support Level</label>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Premium Support
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}