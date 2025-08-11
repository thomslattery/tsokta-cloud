export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  errors?: ApiError[]
  meta?: ResponseMeta
  timestamp: string
}

export interface ApiError {
  code: string
  message: string
  field?: string
  details?: Record<string, any>
}

export interface ResponseMeta {
  page?: number
  limit?: number
  total?: number
  totalPages?: number
  hasNext?: boolean
  hasPrev?: boolean
  requestId?: string
  version?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: ResponseMeta & {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ListParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, any>
}

export interface ApiRequestConfig {
  timeout?: number
  retries?: number
  retryDelay?: number
  headers?: Record<string, string>
  signal?: AbortSignal
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  authenticated?: boolean
  rateLimit?: number
  permissions?: string[]
}

export interface ApiRoute {
  [key: string]: ApiEndpoint | ApiRoute
}

export interface ApiClient {
  get<T = any>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>>
  post<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>>
  put<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>>
  patch<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>>
  delete<T = any>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>>
  upload<T = any>(url: string, file: File, data?: Record<string, string>, config?: ApiRequestConfig): Promise<ApiResponse<T>>
}

export interface RequestInterceptor {
  (config: RequestInit): RequestInit | Promise<RequestInit>
}

export interface ResponseInterceptor {
  (response: Response): Response | Promise<Response>
}

export interface ApiCache {
  get(key: string): any | null
  set(key: string, data: any, ttl?: number): void
  delete(key: string): void
  clear(): void
  has(key: string): boolean
}

export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: Date
  retryAfter?: number
}

export interface ApiKey {
  id: string
  name: string
  key: string
  permissions: string[]
  rateLimits: {
    requestsPerMinute: number
    requestsPerHour: number
    requestsPerDay: number
  }
  isActive: boolean
  expiresAt?: Date
  lastUsed?: Date
  createdAt: Date
  updatedAt: Date
}

export interface WebhookEndpoint {
  id: string
  url: string
  events: string[]
  secret: string
  isActive: boolean
  failureCount: number
  lastSuccessAt?: Date
  lastFailureAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface WebhookDelivery {
  id: string
  webhookId: string
  event: string
  payload: Record<string, any>
  status: 'pending' | 'success' | 'failed' | 'retrying'
  attempts: number
  maxAttempts: number
  nextRetryAt?: Date
  responseStatus?: number
  responseBody?: string
  error?: string
  createdAt: Date
  deliveredAt?: Date
}

export interface ApiLog {
  id: string
  method: string
  path: string
  statusCode: number
  duration: number
  userId?: string
  apiKeyId?: string
  ipAddress: string
  userAgent: string
  requestSize: number
  responseSize: number
  error?: string
  timestamp: Date
}

export interface ApiMetrics {
  totalRequests: number
  successRequests: number
  errorRequests: number
  averageResponseTime: number
  requestsPerSecond: number
  errorRate: number
  byEndpoint: Array<{
    path: string
    method: string
    requests: number
    averageResponseTime: number
    errorRate: number
  }>
  byUser: Array<{
    userId: string
    requests: number
    errorRate: number
  }>
  statusCodes: Record<number, number>
  period: {
    start: Date
    end: Date
  }
}

export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy'
  version: string
  uptime: number
  timestamp: Date
  checks: {
    database: ServiceHealth
    cache: ServiceHealth
    storage: ServiceHealth
    authentication: ServiceHealth
    external: ServiceHealth
  }
}

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  responseTime?: number
  uptime?: number
  lastCheck: Date
  error?: string
  details?: Record<string, any>
}

export interface ApiVersion {
  version: string
  releaseDate: Date
  deprecated: boolean
  sunsetDate?: Date
  changelog: string[]
  breakingChanges: string[]
  migration?: string
}

export interface OpenApiSpec {
  openapi: string
  info: {
    title: string
    version: string
    description?: string
    contact?: {
      name: string
      email: string
      url?: string
    }
    license?: {
      name: string
      url?: string
    }
  }
  servers: Array<{
    url: string
    description?: string
  }>
  paths: Record<string, any>
  components: {
    schemas: Record<string, any>
    securitySchemes: Record<string, any>
  }
  security: Array<Record<string, string[]>>
}

export interface BatchRequest {
  requests: Array<{
    method: string
    url: string
    body?: any
    headers?: Record<string, string>
  }>
}

export interface BatchResponse {
  responses: Array<{
    status: number
    body: any
    headers: Record<string, string>
    error?: string
  }>
}