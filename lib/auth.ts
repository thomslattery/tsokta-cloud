// Simple authentication utility functions
// In a real application, you would integrate with a proper auth service

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  company?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Demo user for testing
const DEMO_USER: User = {
  id: '1',
  email: 'demo@tsoktasprockets.com',
  name: 'Demo User',
  role: 'admin',
  company: 'Tsokta Sprockets Demo'
}

// Demo credentials
const DEMO_CREDENTIALS = {
  email: 'demo@tsoktasprockets.com',
  password: 'demo123'
}

export async function authenticateUser(credentials: LoginCredentials): Promise<User | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Check demo credentials
  if (
    credentials.email === DEMO_CREDENTIALS.email &&
    credentials.password === DEMO_CREDENTIALS.password
  ) {
    return DEMO_USER
  }
  
  // In a real app, you would make an API call here
  throw new Error('Invalid credentials')
}

export function validateCredentials(credentials: LoginCredentials): string | null {
  if (!credentials.email) {
    return 'Email is required'
  }
  
  if (!credentials.password) {
    return 'Password is required'
  }
  
  if (!isValidEmail(credentials.email)) {
    return 'Please enter a valid email address'
  }
  
  if (credentials.password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  
  return null
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Local storage helpers for demo purposes
// In production, use secure session management
export function storeAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

export function getCurrentUser(): User | null {
  // In a real app, you would decode the JWT token or make an API call
  const token = getAuthToken()
  if (token === 'demo_token') {
    return DEMO_USER
  }
  return null
}

export async function signOut(): Promise<void> {
  removeAuthToken()
  // In a real app, you might also invalidate the token on the server
}

// Password strength validation
export function validatePasswordStrength(password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0
  
  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push('Use at least 8 characters')
  }
  
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Include lowercase letters')
  }
  
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Include uppercase letters')
  }
  
  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push('Include numbers')
  }
  
  if (/[^a-zA-Z\d]/.test(password)) {
    score += 1
  } else {
    feedback.push('Include special characters')
  }
  
  return {
    isValid: score >= 3,
    score,
    feedback
  }
}

// Session management
export function createSession(user: User): string {
  // In a real app, this would be handled by your auth service
  const sessionToken = 'demo_token'
  storeAuthToken(sessionToken)
  return sessionToken
}

export function isSessionValid(): boolean {
  const token = getAuthToken()
  return token !== null
}