import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'

// Extend the built-in session and user types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      company?: string
      department?: string
      oktaId?: string
    }
  }

  interface User {
    id: string
    role?: string
    company?: string
    department?: string
    oktaId?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    company?: string
    department?: string
    oktaId?: string
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'okta',
      name: 'Okta',
      type: 'oauth',
      wellKnown: `${process.env.OKTA_DOMAIN}/.well-known/openid_configuration`,
      authorization: {
        params: {
          scope: 'openid email profile groups',
        },
      },
      clientId: process.env.OKTA_CLIENT_ID!,
      clientSecret: process.env.OKTA_CLIENT_SECRET!,
      issuer: process.env.OKTA_DOMAIN,
      profile(profile) {
        console.log('Okta profile:', profile)
        
        // Extract role from Okta groups or custom claims
        const role = extractRoleFromProfile(profile)
        const company = profile.company || profile.organization || 'Unknown Company'
        const department = profile.department || profile.dept || 'General'

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role,
          company,
          department,
          oktaId: profile.sub,
        }
      },
    },
  ],
  
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Persist additional user info in the token
      if (user) {
        token.role = user.role
        token.company = user.company
        token.department = user.department
        token.oktaId = user.oktaId
      }

      // If using Okta tokens, you can access them here
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.idToken = account.id_token
      }

      return token
    },

    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.company = token.company
        session.user.department = token.department
        session.user.oktaId = token.oktaId
      }

      return session
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },

  events: {
    async signIn(message) {
      console.log('User signed in:', message.user.email)
    },
    async signOut(message) {
      console.log('User signed out:', message.token?.email)
    },
  },

  debug: process.env.NODE_ENV === 'development',
}

// Helper function to extract role from Okta profile
function extractRoleFromProfile(profile: any): string {
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }