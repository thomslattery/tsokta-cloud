'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { authService, User } from '@/lib/auth'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await authService.isAuthenticated()
        setIsAuthenticated(authStatus)
        
        if (authStatus) {
          const currentUser = await authService.getUser()
          setUser(currentUser)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      setIsAuthenticated(false)
      setUser(null)
      window.location.reload() // Refresh to update the page state
    } catch (error) {
      console.error('Sign out failed:', error)
      // Force page reload even if signout fails
      window.location.reload()
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Tsokta Sprockets</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#products" className="text-gray-700 hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            
            {/* Conditional Auth Buttons */}
            {isLoading ? (
              <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{user?.name || user?.email || 'User'}</span>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Customer Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Home
              </Link>
              <Link href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Features
              </Link>
              <Link href="#products" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Products
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Contact
              </Link>
              
              {/* Mobile Auth Section */}
              {isLoading ? (
                <div className="mx-3 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              ) : isAuthenticated ? (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <Link 
                    href="/dashboard"
                    className="block text-gray-700 hover:text-blue-600 px-3 py-2 font-medium"
                  >
                    Dashboard
                  </Link>
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Signed in as <span className="font-medium">{user?.name || user?.email || 'User'}</span>
                  </div>
                  <button 
                    onClick={handleSignOut}
                    className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 mx-3 mt-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login"
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 mx-3"
                >
                  Customer Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}