import { Status } from './index'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: Status
  company?: string
  department?: string
  oktaId?: string
  avatar?: string
  phone?: string
  timezone?: string
  locale?: string
  lastLoginAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'admin' | 'employee' | 'customer'

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AdminUser extends User {
  role: 'admin' | 'employee'
  permissions: Permission[]
  employeeId?: string
  managedCustomers?: string[]
  accessLevel: 'full' | 'limited' | 'readonly'
}

export interface CustomerUser extends User {
  role: 'customer'
  customerId: string
  tier: CustomerTier
  deviceCount: number
  totalSpent: number
  lastOrderAt?: Date
  supportLevel: 'basic' | 'premium' | 'enterprise'
  billingContact?: boolean
  technicalContact?: boolean
}

export type CustomerTier = 'basic' | 'premium' | 'enterprise'

export interface Permission {
  id: string
  name: string
  resource: string
  actions: PermissionAction[]
  conditions?: Record<string, any>
}

export type PermissionAction = 
  | 'create' 
  | 'read' 
  | 'update' 
  | 'delete' 
  | 'manage' 
  | 'view' 
  | 'execute'

export interface Role {
  id: string
  name: string
  description?: string
  permissions: Permission[]
  isSystem: boolean
  userCount: number
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  userId: string
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  emailNotifications: {
    orderUpdates: boolean
    securityAlerts: boolean
    productUpdates: boolean
    marketingEmails: boolean
  }
  dashboardLayout?: Record<string, any>
  itemsPerPage: number
}

export interface UserSession {
  id: string
  userId: string
  deviceId: string
  deviceName?: string
  ipAddress: string
  userAgent: string
  location?: {
    country: string
    city: string
    region: string
  }
  isActive: boolean
  lastActivity: Date
  createdAt: Date
  expiresAt: Date
}

export interface UserActivity {
  id: string
  userId: string
  action: string
  resource?: string
  resourceId?: string
  metadata?: Record<string, any>
  ipAddress: string
  userAgent: string
  timestamp: Date
}

export interface PasswordResetRequest {
  id: string
  userId: string
  email: string
  token: string
  expiresAt: Date
  usedAt?: Date
  createdAt: Date
}

export interface UserInvitation {
  id: string
  email: string
  role: UserRole
  invitedBy: string
  company?: string
  department?: string
  message?: string
  token: string
  status: 'pending' | 'accepted' | 'expired' | 'cancelled'
  expiresAt: Date
  acceptedAt?: Date
  createdAt: Date
}

export interface TwoFactorAuth {
  userId: string
  enabled: boolean
  method: '2fa_app' | 'sms' | 'email'
  backupCodes: string[]
  lastUsed?: Date
  enabledAt: Date
}

export interface ApiKey {
  id: string
  userId: string
  name: string
  key: string
  permissions: string[]
  lastUsed?: Date
  expiresAt?: Date
  isActive: boolean
  createdAt: Date
}

export interface UserProfile {
  user: User
  preferences: UserPreferences
  sessions: UserSession[]
  recentActivity: UserActivity[]
  twoFactorAuth?: TwoFactorAuth
  apiKeys: ApiKey[]
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  phone?: string
  company?: string
  department?: string
  timezone?: string
  locale?: string
}

export interface UpdateUserRoleRequest {
  role: UserRole
  permissions?: string[]
  company?: string
  department?: string
}

export interface CreateUserRequest {
  name: string
  email: string
  role: UserRole
  company?: string
  department?: string
  permissions?: string[]
  sendInvitation?: boolean
}

export interface UserStats {
  total: number
  active: number
  inactive: number
  byRole: Record<UserRole, number>
  byTier: Record<CustomerTier, number>
  newThisMonth: number
  activeThisMonth: number
  retentionRate: number
}

export interface UserSearchFilters {
  role?: UserRole
  status?: Status
  company?: string
  department?: string
  tier?: CustomerTier
  lastLoginAfter?: Date
  lastLoginBefore?: Date
  createdAfter?: Date
  createdBefore?: Date
}