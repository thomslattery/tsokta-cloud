'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const searchParams = useSearchParams()
  
  const error = searchParams.get('error')
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = callbackUrl
    }
  }, [isAuthenticated, callbackUrl])

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await login(callbackUrl)
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'OAuthSignin':
        return 'Error in constructing an authorization URL'
      case 'OAuthCallback':
        return 'Error in handling the response from the OAuth provider'
      case 'OAuthCreateAccount':
        return 'Could not create OAuth account'
      case 'EmailCreateAccount':
        return 'Could not create email account'
      case 'Callback':
        return 'Error in the OAuth callback handler route'
      case 'OAuthAccountNotLinked':
        return 'Email already exists with a different sign-in method'
      case 'EmailSignin':
        return 'Check your email for the sign-in link'
      case 'CredentialsSignin':
        return 'Invalid credentials'
      case 'SessionRequired':
        return 'Please sign in to access this page'
      case 'AccessDenied':
        return 'Access denied. You may not have the required permissions'
      default:
        return error ? 'An error occurred during sign in' : null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">
            Tsokta Sprockets
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to your account
          </h2>
          <p className="text-sm text-gray-600">
            Access your customer portal or employee dashboard
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Authentication Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {getErrorMessage(error)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Sign in securely through your organization's Okta portal
              </p>
            </div>

            <Button
              onClick={handleSignIn}
              isLoading={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
              size="large"
            >
              {isLoading ? (
                'Redirecting to Okta...'
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Sign in with Okta
                </>
              )}
            </Button>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="text-xs text-gray-500 space-y-2">
                <p>
                  <strong>For Customers:</strong> Use your company email address
                </p>
                <p>
                  <strong>For Employees:</strong> Use your @tsoktasprockets.com email
                </p>
                <p>
                  Need help? Contact <a href="mailto:support@tsoktasprockets.com" className="text-indigo-600 hover:text-indigo-500">support@tsoktasprockets.com</a>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          Secured by Okta • Single Sign-On • Multi-Factor Authentication
        </p>
      </div>
    </div>
  )
}