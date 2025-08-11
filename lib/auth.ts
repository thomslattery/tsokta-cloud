import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export interface AuthConfig {
  sessionDuration: number
  tokenKey: string
  refreshThreshold: number
}

export const authConfig: AuthConfig = {
  sessionDuration: 24 * 60 * 60 * 1000, // 24 hours
  tokenKey: 'tsokta_auth_token',
  refreshThreshold: 5 * 60 * 1000, // 5 minutes before expiry
}

// Helper function to extract role from Okta profile
export function extractRoleFromProfile(profile: any): string {
  // Method 1: Check for custom claims
  if (profile.role) return profile.role
  if (profile['custom:role']) return profile['custom:role']
  
  // Method 2: Check Okta groups
  const groups = profile.groups || []
  
  // Map Okta groups to application roles
  if (groups.includes('Tsokta-Admins') || groups.includes('Admin')) return 'admin'
  if (groups.includes('Tsokta-Employees') || groups.includes('Employee')) return 'employee'
  if (groups.includes('Tsokta-Customers') || groups.includes('Customer')) return 'customer'
  
  // Method 3: Check email domain for role assignment
  const email = profile.email || ''
  if (email.endsWith('@tsoktasprockets.com')) {
    return 'employee' // Internal employees
  }
  
  // Default role
  return 'customer'
}

// Helper function to extract company from profile
export function extractCompanyFromProfile(profile: any): string {
  // Check various possible company fields
  if (profile.company) return profile.company
  if (profile.organization) return profile.organization
  if (profile.org) return profile.org
  if (profile['custom:company']) return profile['custom:company']
  
  // Extract from email domain as fallback
  const email = profile.email || ''
  if (email.includes('@')) {
    const domain = email.split('@')[1]
    if (domain === 'tsoktasprockets.com') {
      return 'Tsokta Sprockets'
    }
    // Convert domain to company name (basic heuristic)
    return domain.split('.')[0]
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  return 'Unknown Company'
}

// Helper function to extract department from profile
export function extractDepartmentFromProfile(profile: any): string {
  if (profile.department) return profile.department
  if (profile.dept) return profile.dept
  if (profile.division) return profile.division
  if (profile['custom:department']) return profile['custom:department']
  
  // Default based on role
  const role = extractRoleFromProfile(profile)
  switch (role) {
    case 'admin': return 'Administration'
    case 'employee': return 'General'
    case 'customer': return 'Customer'
    default: return 'General'
  }
}

// Validate JWT token structure
export function validateToken(token: JWT): boolean {
  try {
    // Check required fields
    if (!token.sub || !token.email) {
      return false
    }

    // Check expiration
    if (token.exp && Date.now() >= token.exp * 1000) {
      return false
    }

    return true
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
}

// Check if token needs refresh
export function shouldRefreshToken(token: JWT): boolean {
  if (!token.exp) return false
  
  const expiryTime = token.exp * 1000
  const currentTime = Date.now()
  const timeUntilExpiry = expiryTime - currentTime
  
  return timeUntilExpiry < authConfig.refreshThreshold
}

// Get user permissions based on role
export function getUserPermissions(role: string): string[] {
  const permissions: Record<string, string[]> = {
    admin: [
      'read:all',
      'write:all',
      'delete:all',
      'manage:users',
      'manage:system',
      'view:analytics',
      'manage:support',
      'manage:billing'
    ],
    employee: [
      'read:customers',
      'write:customers',
      'read:orders',
      'write:orders',
      'read:products',
      'manage:support',
      'view:analytics'
    ],
    customer: [
      'read:own',
      'write:own',
      'create:orders',
      'read:products',
      'create:support'
    ]
  }
  
  return permissions[role] || permissions.customer
}

// Check if user has specific permission
export function hasPermission(userRole: string, permission: string): boolean {
  const userPermissions = getUserPermissions(userRole)
  
  // Check for exact match
  if (userPermissions.includes(permission)) {
    return true
  }
  
  // Check for wildcard permissions
  const [action, resource] = permission.split(':')
  if (userPermissions.includes(`${action}:all`)) {
    return true
  }
  
  return false
}

// Generate secure random string for CSRF protection
export function generateSecureRandom(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    // Browser environment
    const randomArray = new Uint8Array(length)
    window.crypto.getRandomValues(randomArray)
    for (let i = 0; i < length; i++) {
      result += chars[randomArray[i] % chars.length]
    }
  } else {
    // Fallback for server-side or older browsers
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
  }
  
  return result
}

// Sanitize redirect URLs to prevent open redirect attacks
export function sanitizeRedirectUrl(url: string, baseUrl: string): string {
  try {
    // Allow relative URLs
    if (url.startsWith('/')) {
      return url
    }
    
    // Check if URL is from same origin
    const redirectUrl = new URL(url)
    const base = new URL(baseUrl)
    
    if (redirectUrl.origin === base.origin) {
      return url
    }
    
    // Default to home page for external URLs
    return '/'
  } catch {
    // Invalid URL, return home page
    return '/'
  }
}

// Rate limiting helper for authentication attempts
export class AuthRateLimit {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map()
  private maxAttempts: number
  private windowMs: number

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  isBlocked(identifier: string): boolean {
    const now = Date.now()
    const attemptData = this.attempts.get(identifier)

    if (!attemptData) return false

    // Clean up old attempts
    if (now - attemptData.lastAttempt > this.windowMs) {
      this.attempts.delete(identifier)
      return false
    }

    return attemptData.count >= this.maxAttempts
  }

  recordAttempt(identifier: string): void {
    const now = Date.now()
    const attemptData = this.attempts.get(identifier)

    if (!attemptData || now - attemptData.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now })
    } else {
      this.attempts.set(identifier, {
        count: attemptData.count + 1,
        lastAttempt: now
      })
    }
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier)
  }

  getTimeUntilReset(identifier: string): number {
    const attemptData = this.attempts.get(identifier)
    if (!attemptData) return 0

    const timePassed = Date.now() - attemptData.lastAttempt
    return Math.max(0, this.windowMs - timePassed)
  }
}

// Create global rate limiter instance
export const authRateLimit = new AuthRateLimit()

// Session storage helpers (for client-side session management)
export const sessionStorage = {
  get: (key: string): any => {
    if (typeof window === 'undefined') return null
    
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set: (key: string, value: any): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Session storage error:', error)
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.sessionStorage.removeItem(key)
    } catch (error) {
      console.error('Session storage error:', error)
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.sessionStorage.clear()
    } catch (error) {
      console.error('Session storage error:', error)
    }
  }
}

// Local storage helpers (for persistent client-side storage)
export const localStorage = {
  get: (key: string): any => {
    if (typeof window === 'undefined') return null
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set: (key: string, value: any): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Local storage error:', error)
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error('Local storage error:', error)
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return
    
    try {
      window.localStorage.clear()
    } catch (error) {
      console.error('Local storage error:', error)
    }
  }
}