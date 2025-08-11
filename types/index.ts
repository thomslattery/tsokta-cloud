// Re-export all types from individual files
export * from './user'
export * from './product'
export * from './order'
export * from './support'
export * from './analytics'
export * from './api'

// Common utility types
export type Status = 'active' | 'inactive' | 'pending' | 'suspended'

export type Priority = 'low' | 'medium' | 'high' | 'critical'

export type SortOrder = 'asc' | 'desc'

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface SearchParams {
  query?: string
  filters?: Record<string, any>
  pagination?: PaginationParams
}

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  errors?: string[]
  meta?: PaginationMeta
}

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
  description?: string
}

export interface FormError {
  field: string
  message: string
  code?: string
}

export interface UploadFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Date
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionText?: string
}

export interface AuditLog {
  id: string
  userId: string
  userEmail: string
  action: string
  resource: string
  resourceId: string
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
  metadata?: Record<string, any>
  timestamp: Date
  ipAddress?: string
  userAgent?: string
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down'
  uptime: number
  responseTime: number
  lastChecked: Date
  services: {
    database: ServiceStatus
    authentication: ServiceStatus
    storage: ServiceStatus
    email: ServiceStatus
  }
}

export interface ServiceStatus {
  status: 'healthy' | 'degraded' | 'down'
  responseTime?: number
  uptime?: number
  lastError?: string
  lastChecked: Date
}

export interface Feature {
  key: string
  name: string
  description?: string
  enabled: boolean
  rolloutPercentage?: number
  conditions?: Record<string, any>
}

export interface AppConfig {
  version: string
  environment: 'development' | 'staging' | 'production'
  features: Feature[]
  maintenance: {
    enabled: boolean
    message?: string
    estimatedDuration?: number
    startTime?: Date
    endTime?: Date
  }
  limits: {
    uploadSize: number
    requestRate: number
    sessionTimeout: number
  }
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}