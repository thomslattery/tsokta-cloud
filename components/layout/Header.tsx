'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, isAuthenticated, isLoading, logout, isCustomer, isEmployee, isAdmin } = useAuth()

  const getNavigation = () => {
    const baseNav = [...navigation]
    
    if (isAuthenticated) {
      if (isCustomer) {
        baseNav.push({ name: 'Dashboard', href: '/customer/dashboard' })
      }
      if (isEmployee || isAdmin) {
        baseNav.push({ name: 'Admin', href: '/admin/dashboard' })
      }
    }
    
    return baseNav
  }

  const handleSignOut = async () => {
    setUserMenuOpen(false)
    await logout('/')
  }

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Tsokta Sprockets
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {getNavigation().map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Authentication Section */}
            <div className="ml-4 flex items-center space-x-3">
              {isLoading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
              ) : isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt={user.name || 'User'} 
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <UserIcon className="w-6 h-6" />
                    )}
                    <span className="max-w-32 truncate">{user.name || user.email}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-500 border-b">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs">{user.email}</div>
                          {user.company && (
                            <div className="text-xs text-indigo-600">{user.company}</div>
                          )}
                          {user.role && (
                            <div className="text-xs capitalize bg-gray-100 inline-block px-2 py-1 rounded mt-1">
                              {user.role}
                            </div>
                          )}
                        </div>
                        
                        {isCustomer && (
                          <Link
                            href="/customer/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Customer Dashboard
                          </Link>
                        )}
                        
                        {(isEmployee || isAdmin) && (
                          <Link
                            href="/admin/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Profile Settings
                        </Link>
                        
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/auth/signin">
                    <Button variant="outline" size="small">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="small">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
              {getNavigation().map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="border-t pt-3 mt-3">
                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-500">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs">{user.email}</div>
                      {user.company && <div className="text-xs text-indigo-600">{user.company}</div>}
                    </div>
                    
                    {isCustomer && (
                      <Link
                        href="/customer/dashboard"
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Customer Dashboard
                      </Link>
                    )}
                    
                    {(isEmployee || isAdmin) && (
                      <Link
                        href="/admin/dashboard"
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    
                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/auth/signin"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/contact"
                      className="block px-3 py-2 text-indigo-600 hover:bg-gray-50 rounded-md font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact Sales
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}