'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin?callbackUrl=/profile')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const handleSignOut = async () => {
    await logout('/')
  }

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-xl text-gray-600 mt-2">Manage your account information</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User Information */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt={user.name || 'User'} 
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1">
                      <span className="capitalize px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                        {user.role}
                      </span>
                    </dd>
                  </div>
                  
                  {user.company && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Company</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.company}</dd>
                    </div>
                  )}
                  
                  {user.department && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Department</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.department}</dd>
                    </div>
                  )}
                  
                  {user.oktaId && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Okta ID</dt>
                      <dd className="mt-1 text-sm text-gray-900 font-mono">{user.oktaId}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </Card>

          {/* Account Actions */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Actions</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Dashboard Access</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Access your role-specific dashboard and features.
                </p>
                {user.role === 'customer' && (
                  <Button onClick={() => router.push('/customer/dashboard')} size="small">
                    Go to Customer Dashboard
                  </Button>
                )}
                {(user.role === 'admin' || user.role === 'employee') && (
                  <Button onClick={() => router.push('/admin/dashboard')} size="small">
                    Go to Admin Dashboard
                  </Button>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Account Settings</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Profile settings are managed through your Okta account.
                </p>
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => window.open(`${process.env.NEXT_PUBLIC_OKTA_DOMAIN || 'https://your-okta-domain.okta.com'}/enduser/settings`, '_blank')}
                >
                  Manage in Okta
                </Button>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">Sign Out</h3>
                <p className="text-red-700 text-sm mb-3">
                  Sign out of your Tsokta Sprockets account.
                </p>
                <Button 
                  variant="danger" 
                  size="small"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Security Information */}
        <div className="mt-8">
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Security & Privacy</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Authentication Method</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Your account is secured through Okta Single Sign-On (SSO) with multi-factor authentication.
                </p>
                <div className="flex items-center space-x-2 text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">Secured by Okta</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Privacy</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Your personal information is protected according to our privacy policy and GDPR compliance.
                </p>
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                  View Privacy Policy →
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}