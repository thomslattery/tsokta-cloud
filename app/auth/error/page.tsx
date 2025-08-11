'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorDetails = (errorType: string | null) => {
    switch (errorType) {
      case 'Configuration':
        return {
          title: 'Server Configuration Error',
          description: 'There is a problem with the server configuration. Please contact support.',
          icon: '⚙️'
        }
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          description: 'You do not have permission to sign in. Please contact your administrator.',
          icon: '🚫'
        }
      case 'Verification':
        return {
          title: 'Verification Failed',
          description: 'The verification token has expired or is invalid. Please try signing in again.',
          icon: '⚠️'
        }
      case 'Default':
      default:
        return {
          title: 'Authentication Error',
          description: 'An error occurred during the authentication process. Please try again.',
          icon: '❌'
        