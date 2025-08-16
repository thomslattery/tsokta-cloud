'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { authService, validateOktaConfig } from '@/lib/auth'

// Okta Sign-In Widget types
declare global {
  interface Window {
    OktaSignIn: any
  }
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [configError, setConfigError] = useState<string | null>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  const signInWidget = useRef<any>(null)

  useEffect(() => {
    // Validate Okta configuration
    const configValidation = validateOktaConfig()
    if (!configValidation.isValid) {
      setConfigError(configValidation.errors.join(', '))
      setIsLoading(false)
      return
    }

    // Load Okta Sign-In Widget
    const loadOktaWidget = async () => {
      try {
        // Check if already authenticated
        const isAuth = await authService.isAuthenticated()
        if (isAuth) {
          window.location.href = '/dashboard'
          return
        }

        // Load Okta Sign-In Widget script if not already loaded
        if (!window.OktaSignIn) {
          await loadStylesheet('https://global.oktacdn.com/okta-signin-widget/7.18.0/css/okta-sign-in.min.css')
          await loadScript('https://global.oktacdn.com/okta-signin-widget/7.18.0/js/okta-sign-in.min.js')
          
          // Wait a bit for the script to initialize
          await new Promise(resolve => setTimeout(resolve, 100))
          
          // Verify the constructor is available
          if (!window.OktaSignIn) {
            throw new Error('Okta Sign-In Widget failed to load')
          }
        }

        const config = authService.getConfig()
        const oktaAuth = authService.getOktaAuth()

        if (!config || !oktaAuth) {
          throw new Error('Okta configuration not initialized')
        }

        // Initialize the Sign-In Widget
        console.log('Initializing Okta Sign-In Widget...')
        console.log('OktaSignIn constructor available:', typeof window.OktaSignIn)
        
        signInWidget.current = new window.OktaSignIn({
          baseUrl: config.issuer.split('/oauth2')[0], // Extract base URL from issuer
          clientId: config.clientId,
          redirectUri: config.redirectUri,
          authParams: {
            issuer: config.issuer,
            scopes: config.scopes,
            responseType: config.responseType,
            responseMode: config.responseMode,
            state: config.state,
            nonce: config.nonce,
            pkce: config.pkce,
          },
          // Widget configuration
          features: {
            registration: false, // Disable self-registration
            rememberMe: true,
            multiOptionalFactorEnroll: true,
            selfServiceUnlock: true,
            smsRecovery: true,
            callRecovery: false,
            webauthn: true,
            autoPush: true,
          },
          // Customization
          logo: '/images/tsokta-logo.png', // Add your logo
          logoText: 'Tsokta Sprockets Customer Portal',
          helpSupportNumber: '(555) 123-TSOKTA',
          brandName: 'Tsokta Sprockets',
          // Custom colors to match your brand
          colors: {
            brand: '#2563eb', // Blue-600
          },
          // Language and text customization
          language: 'en',
          i18n: {
            en: {
              'primaryauth.title': 'Sign in to Customer Portal',
              'primaryauth.username.placeholder': 'Enter your email',
              'primaryauth.password.placeholder': 'Enter your password',
              'primaryauth.submit': 'Sign In',
            },
          },
          // Custom CSS (optional)
          customButtons: [
            {
              title: 'Need an account?',
              className: 'btn-secondary',
              click: function() {
                // Redirect to contact sales or registration request
                window.location.href = '/#contact'
              }
            }
          ],
        })

        console.log('Okta Sign-In Widget initialized successfully')

        // Handle successful authentication
        signInWidget.current.authClient = oktaAuth

        signInWidget.current.on('afterError', (context: any, error: any) => {
          console.error('Okta widget error:', error)
          setError(error.message || 'Authentication failed')
        })

        signInWidget.current.on('ready', () => {
          setIsLoading(false)
        })

        // Show the widget
        if (widgetRef.current) {
          signInWidget.current.showSignInToGetTokens({
            el: widgetRef.current,
          }).then((tokens: any) => {
            // Store tokens and redirect
            oktaAuth.tokenManager.setTokens(tokens)
            window.location.href = '/dashboard'
          }).catch((error: any) => {
            console.error('Authentication error:', error)
            setError('Authentication failed. Please try again.')
          })
        }

      } catch (error) {
        console.error('Error loading Okta widget:', error)
        setError('Failed to load authentication system')
        setIsLoading(false)
      }
    }

    loadOktaWidget()

    // Cleanup
    return () => {
      if (signInWidget.current) {
        signInWidget.current.remove()
      }
    }
  }, [])

  // Helper function to load external scripts
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.crossOrigin = 'anonymous'
      
      script.onload = () => {
        console.log(`Successfully loaded: ${src}`)
        resolve()
      }
      
      script.onerror = (error) => {
        console.error(`Failed to load script: ${src}`, error)
        reject(new Error(`Failed to load script: ${src}`))
      }
      
      document.head.appendChild(script)
    })
  }

  // Helper function to load external stylesheets
  const loadStylesheet = (href: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if stylesheet is already loaded
      if (document.querySelector(`link[href="${href}"]`)) {
        resolve()
        return
      }

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.crossOrigin = 'anonymous'
      
      link.onload = () => {
        console.log(`Successfully loaded stylesheet: ${href}`)
        resolve()
      }
      
      link.onerror = (error) => {
        console.error(`Failed to load stylesheet: ${href}`, error)
        reject(new Error(`Failed to load stylesheet: ${href}`))
      }
      
      document.head.appendChild(link)
    })
  }

  const handleRetry = () => {
    setError(null)
    setIsLoading(true)
    window.location.reload()
  }

  if (configError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">TS</span>
              </div>
              <span className="text-2xl font-bold text-white">Tsokta Sprockets</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.833-2.598 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Configuration Error</h3>
              <p className="text-sm text-gray-600 mb-4">
                Okta authentication is not properly configured. Please contact your administrator.
              </p>
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                {configError}
              </p>
              <Link 
                href="/"
                className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">TS</span>
            </div>
            <span className="text-2xl font-bold text-white">Tsokta Sprockets</span>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">
            Customer Portal
          </h2>
          <p className="text-blue-100">
            Secure access to your thingamajig dashboard
          </p>
        </div>

        {/* Okta Widget Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {isLoading && (
            <div className="p-8 text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">Loading secure login...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.833-2.598 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication Error</h3>
              <p className="text-sm text-gray-600 mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Okta Sign-In Widget will be rendered here */}
          <div ref={widgetRef} className={isLoading || error ? 'hidden' : ''}></div>
        </div>

        {/* Support Links */}
        <div className="text-center">
          <p className="text-blue-100 text-sm mb-4">
            Having trouble signing in?
          </p>
          <div className="space-x-4">
            <Link href="/#contact" className="text-white hover:text-blue-200 text-sm font-medium">
              Contact Support
            </Link>
            <span className="text-blue-300">•</span>
            <a href="mailto:support@tsokta.cloud" className="text-white hover:text-blue-200 text-sm font-medium">
              Email Help
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}