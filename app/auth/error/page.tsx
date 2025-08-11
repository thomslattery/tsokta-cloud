'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft, RefreshCw, Home, Mail, Shield } from 'lucide-react'

interface AuthError {
  code: string
  title: string
  description: string
  action?: string
  actionLink?: string
}

const authErrors = {
  Configuration: {
    code: 'Configuration',
    title: 'Authentication Configuration Error',
    description: 'There is a problem with the server configuration. Please contact support if this error persists.',
    action: 'Contact Support',
    actionLink: '/contact'
  },
  AccessDenied: {
    code: 'AccessDenied',
    title: 'Access Denied',
    description: 'You do not have permission to sign in. Please contact your administrator for access.',
    action: 'Request Access',
    actionLink: '/contact'
  },
  Verification: {
    code: 'Verification',
    title: 'Email Verification Required',
    description: 'Please check your email and click the verification link to complete your account setup.',
    action: 'Resend Email',
    actionLink: '/auth/verify-request'
  },
  OAuthSignin: {
    code: 'OAuthSignin',
    title: 'OAuth Sign-in Error',
    description: 'There was an error during the OAuth sign-in process. Please try again.',
    action: 'Try Again',
    actionLink: '/auth/signin'
  },
  OAuthCallback: {
    code: 'OAuthCallback',
    title: 'OAuth Callback Error',
    description: 'There was an error processing the OAuth callback. Please try signing in again.',
    action: 'Sign In',
    actionLink: '/auth/signin'
  },
  OAuthCreateAccount: {
    code: 'OAuthCreateAccount',
    title: 'Account Creation Error',
    description: 'There was an error creating your account with the OAuth provider. Please try again or contact support.',
    action: 'Try Again',
    actionLink: '/auth/signin'
  },
  EmailCreateAccount: {
    code: 'EmailCreateAccount',
    title: 'Email Account Creation Error',
    description: 'There was an error creating your account. Please check your information and try again.',
    action: 'Try Again',
    actionLink: '/auth/signup'
  },
  Callback: {
    code: 'Callback',
    title: 'Authentication Callback Error',
    description: 'There was an error during the authentication callback. Please try signing in again.',
    action: 'Sign In',
    actionLink: '/auth/signin'
  },
  OAuthAccountNotLinked: {
    code: 'OAuthAccountNotLinked',
    title: 'Account Not Linked',
    description: 'This OAuth account is not linked to an existing account. Please sign in with your original method first.',
    action: 'Sign In',
    actionLink: '/auth/signin'
  },
  EmailSignin: {
    code: 'EmailSignin',
    title: 'Email Sign-in Error',
    description: 'There was an error sending the sign-in email. Please check your email address and try again.',
    action: 'Try Again',
    actionLink: '/auth/signin'
  },
  CredentialsSignin: {
    code: 'CredentialsSignin',
    title: 'Invalid Credentials',
    description: 'The credentials you provided are incorrect. Please check your email and password and try again.',
    action: 'Try Again',
    actionLink: '/auth/signin'
  },
  SessionRequired: {
    code: 'SessionRequired',
    title: 'Session Required',
    description: 'You need to be signed in to access this page. Please sign in and try again.',
    action: 'Sign In',
    actionLink: '/auth/signin'
  },
  Default: {
    code: 'Default',
    title: 'Authentication Error',
    description: 'An unexpected authentication error occurred. Please try again or contact support if the problem persists.',
    action: 'Try Again',
    actionLink: '/auth/signin'
  }
} as const

const getAuthError = (errorType: string): AuthError => {
  return authErrors[errorType as keyof typeof authErrors] ?? authErrors.Default
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState<AuthError>(authErrors.Default)
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    const errorType = searchParams.get('error') || 'Default'
    setError(getAuthError(errorType))
  }, [searchParams])

  const handleRetry = async () => {
    setIsRetrying(true)
    // Add a small delay for better UX
    setTimeout(() => {
      if (error.actionLink) {
        router.push(error.actionLink)
      }
      setIsRetrying(false)
    }, 1000)
  }

  const getErrorIcon = () => {
    switch (error.code) {
      case 'AccessDenied':
        return <Shield className="w-16 h-16 text-red-500" />
      case 'Verification':
        return <Mail className="w-16 h-16 text-blue-500" />
      default:
        return <AlertTriangle className="w-16 h-16 text-red-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-2xl font-bold text-blue-600">Tsokta Sprockets</h1>
          </Link>
        </div>

        {/* Error Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              {getErrorIcon()}
            </div>

            {/* Error Details */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {error.title}
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {error.description}
            </p>

            {/* Error Code */}
            <div className="bg-gray-50 rounded-lg p-3 mb-8">
              <span className="text-sm text-gray-500">Error Code: </span>
              <code className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                {error.code}
              </code>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {error.actionLink && (
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isRetrying ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {error.action}
                    </>
                  )}
                </button>
              )}

              <Link
                href="/auth/signin"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Link>

              <Link
                href="/"
                className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Still having trouble?{' '}
            <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-500">
              Contact our support team
            </Link>
          </p>
        </div>

        {/* Debug Info (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 rounded-lg p-4 mt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Debug Information</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Error Type: {searchParams.get('error') || 'Not specified'}</div>
              <div>URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</div>
              <div>User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}