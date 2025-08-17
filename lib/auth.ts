// OIDC Authentication with Okta Integration
import React from 'react'
import { OktaAuth, TokenManager, UserClaims } from '@okta/okta-auth-js'

export interface User {
  id: string
  email: string
  name: string
  given_name?: string
  family_name?: string
  locale?: string
  preferred_username?: string
  groups?: string[]
  custom_claims?: Record<string, any>
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  accessToken?: string
  idToken?: string
}

export interface OktaConfig {
  issuer: string
  clientId: string
  redirectUri: string
  scopes: string[]
  pkce: boolean
  responseType: string
}

// Default configuration - these should be set via environment variables
const DEFAULT_CONFIG = {
  scopes: ['openid', 'profile', 'email', 'groups'],
  pkce: true,
  responseType: 'code',
}

class AuthService {
  private oktaAuth: OktaAuth | null = null
  private config: OktaConfig | null = null

  constructor() {
    this.initializeConfig()
  }

  private initializeConfig() {
    // Only initialize on client side
    if (typeof window === 'undefined') return

    // Configuration should come from environment variables
    const issuer = process.env.NEXT_PUBLIC_OKTA_ISSUER
    const clientId = process.env.NEXT_PUBLIC_OKTA_CLIENT_ID
    const redirectUri = process.env.NEXT_PUBLIC_OKTA_REDIRECT_URI || `${window.location.origin}/login/callback`

    if (!issuer || !clientId) {
      console.warn('Okta configuration missing. Please set NEXT_PUBLIC_OKTA_ISSUER and NEXT_PUBLIC_OKTA_CLIENT_ID')
      return
    }

    this.config = {
      issuer,
      clientId,
      redirectUri,
      ...DEFAULT_CONFIG,
    }

    this.oktaAuth = new OktaAuth({
      issuer: this.config.issuer,
      clientId: this.config.clientId,
      redirectUri: this.config.redirectUri,
      scopes: this.config.scopes,
      pkce: this.config.pkce,
      responseType: 'code',
      // Additional Okta-specific options
      transformErrorXHR: (xhr: any) => {
        // Handle custom error transformations if needed
        return xhr
      },
      devMode: process.env.NODE_ENV === 'development',
    } as any)
  }

  getOktaAuth(): OktaAuth | null {
    return this.oktaAuth
  }

  getConfig(): OktaConfig | null {
    return this.config
  }

  async isAuthenticated(): Promise<boolean> {
    if (!this.oktaAuth) return false
    
    try {
      return await this.oktaAuth.isAuthenticated()
    } catch (error) {
      console.error('Error checking authentication status:', error)
      return false
    }
  }

  async getUser(): Promise<User | null> {
    if (!this.oktaAuth) return null

    try {
      const isAuth = await this.isAuthenticated()
      if (!isAuth) return null

      const userInfo = await this.oktaAuth.getUser() as UserClaims
      const tokenManager = this.oktaAuth.tokenManager
      const accessToken = await tokenManager.get('accessToken')
      const idToken = await tokenManager.get('idToken')

      // Extract custom claims from ID token if available
      const customClaims: Record<string, any> = {}
      if (idToken && 'claims' in idToken) {
        const claims = (idToken as any).claims
        Object.keys(claims).forEach(key => {
          if (!['aud', 'exp', 'iat', 'iss', 'sub', 'nonce', 'auth_time'].includes(key)) {
            customClaims[key] = claims[key]
          }
        })
      }

      return {
        id: userInfo.sub || '',
        email: userInfo.email || '',
        name: userInfo.name || `${userInfo.given_name || ''} ${userInfo.family_name || ''}`.trim(),
        given_name: userInfo.given_name,
        family_name: userInfo.family_name,
        locale: userInfo.locale,
        preferred_username: userInfo.preferred_username,
        groups: Array.isArray(userInfo.groups) ? userInfo.groups.map(group => String(group)) : [],
        custom_claims: customClaims,
      }
    } catch (error) {
      console.error('Error getting user info:', error)
      return null
    }
  }

  async getTokens(): Promise<{ accessToken?: string; idToken?: string }> {
    if (!this.oktaAuth) return {}

    try {
      const tokenManager = this.oktaAuth.tokenManager
      const accessToken = await tokenManager.get('accessToken')
      const idToken = await tokenManager.get('idToken')

      return {
        accessToken: accessToken ? (accessToken as any).accessToken || (accessToken as any).value : undefined,
        idToken: idToken ? (idToken as any).idToken || (idToken as any).value : undefined,
      }
    } catch (error) {
      console.error('Error getting tokens:', error)
      return {}
    }
  }

  async signOut(): Promise<void> {
    if (!this.oktaAuth) return

    try {
      // Clear tokens from storage
      await this.oktaAuth.signOut()
      
      // Optionally redirect to Okta for complete logout
      // await this.oktaAuth.signOut({ postLogoutRedirectUri: window.location.origin })
    } catch (error) {
      console.error('Error during sign out:', error)
      // Clear local tokens even if remote logout fails
      this.oktaAuth.tokenManager.clear()
    }
  }

  async refreshTokens(): Promise<boolean> {
    if (!this.oktaAuth) return false

    try {
      const tokenManager = this.oktaAuth.tokenManager
      await tokenManager.renew('accessToken')
      await tokenManager.renew('idToken')
      return true
    } catch (error) {
      console.error('Error refreshing tokens:', error)
      return false
    }
  }

  // Handle the callback after OIDC authentication
  async handleAuthCallback(): Promise<User | null> {
    if (!this.oktaAuth) return null

    try {
      // Parse tokens from URL
      await this.oktaAuth.handleRedirect()
      return await this.getUser()
    } catch (error) {
      console.error('Error handling auth callback:', error)
      throw error
    }
  }

  // Set up token auto-renewal
  setupTokenRenewal(): void {
    if (!this.oktaAuth) return

    this.oktaAuth.tokenManager.on('renewed', (key: string, newToken: any, oldToken: any) => {
      console.log(`Token ${key} renewed successfully`)
    })

    this.oktaAuth.tokenManager.on('error', (error: any) => {
      console.error('Token manager error:', error)
      // Optionally redirect to login
    })

    // Start the service to automatically renew tokens
    this.oktaAuth.start()
  }

  // Check if user has specific groups/roles
  hasGroup(user: User | null, groupName: string): boolean {
    return user?.groups?.includes(groupName) || false
  }

  hasAnyGroup(user: User | null, groupNames: string[]): boolean {
    return groupNames.some(group => this.hasGroup(user, group))
  }

  // Get custom claim value
  getCustomClaim(user: User | null, claimName: string): any {
    return user?.custom_claims?.[claimName]
  }
}

// Create singleton instance
export const authService = new AuthService()

// Utility functions for backward compatibility
export async function getCurrentUser(): Promise<User | null> {
  return await authService.getUser()
}

export async function isAuthenticated(): Promise<boolean> {
  return await authService.isAuthenticated()
}

export async function signOut(): Promise<void> {
  return await authService.signOut()
}

export async function getTokens(): Promise<{ accessToken?: string; idToken?: string }> {
  return await authService.getTokens()
}

// React hook for authentication state
export function useAuth() {
  const [authState, setAuthState] = React.useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  React.useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    const checkAuth = async () => {
      try {
        const isAuth = await authService.isAuthenticated()
        if (isAuth) {
          const user = await authService.getUser()
          const tokens = await authService.getTokens()
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            ...tokens,
          })
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      } catch (error) {
        console.error('Error checking auth state:', error)
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    }

    checkAuth()

    // Set up token renewal
    authService.setupTokenRenewal()
  }, [])

  return authState
}

// Environment configuration validation
export function validateOktaConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!process.env.NEXT_PUBLIC_OKTA_ISSUER) {
    errors.push('NEXT_PUBLIC_OKTA_ISSUER is required')
  }
  
  if (!process.env.NEXT_PUBLIC_OKTA_CLIENT_ID) {
    errors.push('NEXT_PUBLIC_OKTA_CLIENT_ID is required')
  }

  // Validate issuer format
  if (process.env.NEXT_PUBLIC_OKTA_ISSUER && 
      !process.env.NEXT_PUBLIC_OKTA_ISSUER.includes('/oauth2/')) {
    errors.push('NEXT_PUBLIC_OKTA_ISSUER should include the authorization server path (e.g., /oauth2/ausXXXXXX)')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}