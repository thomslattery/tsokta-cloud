export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export interface ApiRequestConfig extends RequestInit {
  timeout?: number
  retries?: number
  retryDelay?: number
}

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  errors?: string[]
  meta?: {
    page?: number
    limit?: number
    total?: number
    hasNext?: boolean
    hasPrev?: boolean
  }
}

class ApiClient {
  private baseUrl: string
  private defaultTimeout: number = 30000
  private defaultRetries: number = 3
  private defaultRetryDelay: number = 1000

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL || '/api'
  }

  // Main request method
  async request<T = any>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      retryDelay = this.defaultRetryDelay,
      ...fetchConfig
    } = config

    const url = this.buildUrl(endpoint)
    const requestConfig = this.buildRequestConfig(fetchConfig)

    let lastError: Error
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, requestConfig, timeout)
        return await this.handleResponse<T>(response)
      } catch (error) {
        lastError = error as Error
        
        // Don't retry on certain errors
        if (error instanceof ApiError && !this.shouldRetry(error.status)) {
          throw error
        }
        
        // Don't retry on last attempt
        if (attempt === retries) {
          break
        }
        
        // Wait before retrying
        await this.delay(retryDelay * Math.pow(2, attempt))
      }
    }
    
    throw lastError!
  }

  // HTTP method helpers
  async get<T = any>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T = any>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async put<T = any>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async patch<T = any>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async delete<T = any>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }

  // File upload helper
  async upload<T = any>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, string>,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }

    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
        ...config?.headers
      }
    })
  }

  // Private helper methods
  private buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http')) {
      return endpoint
    }
    
    const cleanBase = this.baseUrl.replace(/\/$/, '')
    const cleanEndpoint = endpoint.replace(/^\//, '')
    return `${cleanBase}/${cleanEndpoint}`
  }

  private buildRequestConfig(config: RequestInit): RequestInit {
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Add authentication token if available
    if (typeof window !== 'undefined') {
      const token = this.getAuthToken()
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`
      }
    }

    return {
      credentials: 'include',
      ...config,
      headers: {
        ...defaultHeaders,
        ...config.headers
      }
    }
  }

  private async fetchWithTimeout(
    url: string,
    config: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408)
      }
      throw error
    }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    let data: any

    try {
      const text = await response.text()
      data = text ? JSON.parse(text) : {}
    } catch (error) {
      throw new ApiError(
        'Failed to parse response',
        response.status,
        response
      )
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        data,
        data.code
      )
    }

    return {
      data: data.data ?? data,
      message: data.message,
      success: data.success ?? true,
      errors: data.errors,
      meta: data.meta
    }
  }

  private shouldRetry(status: number): boolean {
    // Retry on server errors and rate limits
    return status >= 500 || status === 429
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private getAuthToken(): string | null {
    try {
      // Try to get token from session storage first
      const sessionToken = sessionStorage.getItem('auth-token')
      if (sessionToken) return sessionToken

      // Fallback to localStorage
      const localToken = localStorage.getItem('auth-token')
      if (localToken) return localToken

      return null
    } catch {
      return null
    }
  }

  // Configuration methods
  setBaseUrl(url: string): void {
    this.baseUrl = url
  }

  setTimeout(timeout: number): void {
    this.defaultTimeout = timeout
  }

  setRetries(retries: number): void {
    this.defaultRetries = retries
  }
}

// Create singleton instance
export const api = new ApiClient()

// Typed API endpoints for the application
export const apiEndpoints = {
  // Authentication
  auth: {
    session: () => api.get('/auth/session'),
    signOut: () => api.post('/auth/signout')
  },

  // Users
  users: {
    profile: () => api.get('/users/profile'),
    updateProfile: (data: any) => api.patch('/users/profile', data),
    changePassword: (data: { currentPassword: string; newPassword: string }) =>
      api.post('/users/change-password', data)
  },

  // Customers
  customers: {
    list: (params?: { page?: number; limit?: number; search?: string; status?: string }) =>
      api.get('/customers', { ...params && { body: JSON.stringify(params) } }),
    get: (id: string) => api.get(`/customers/${id}`),
    create: (data: any) => api.post('/customers', data),
    update: (id: string, data: any) => api.patch(`/customers/${id}`, data),
    delete: (id: string) => api.delete(`/customers/${id}`),
    updateStatus: (id: string, status: string) =>
      api.patch(`/customers/${id}/status`, { status })
  },

  // Orders
  orders: {
    list: (params?: { page?: number; limit?: number; status?: string; customerId?: string }) =>
      api.get('/orders', { ...params && { body: JSON.stringify(params) } }),
    get: (id: string) => api.get(`/orders/${id}`),
    create: (data: any) => api.post('/orders', data),
    update: (id: string, data: any) => api.patch(`/orders/${id}`, data),
    cancel: (id: string) => api.patch(`/orders/${id}/cancel`),
    updateStatus: (id: string, status: string) =>
      api.patch(`/orders/${id}/status`, { status })
  },

  // Products
  products: {
    list: (params?: { page?: number; limit?: number; category?: string; search?: string }) =>
      api.get('/products', { ...params && { body: JSON.stringify(params) } }),
    get: (id: string) => api.get(`/products/${id}`),
    create: (data: any) => api.post('/products', data),
    update: (id: string, data: any) => api.patch(`/products/${id}`, data),
    delete: (id: string) => api.delete(`/products/${id}`)
  },

  // Support Tickets
  tickets: {
    list: (params?: { page?: number; limit?: number; status?: string; priority?: string }) =>
      api.get('/support/tickets', { ...params && { body: JSON.stringify(params) } }),
    get: (id: string) => api.get(`/support/tickets/${id}`),
    create: (data: any) => api.post('/support/tickets', data),
    update: (id: string, data: any) => api.patch(`/support/tickets/${id}`, data),
    addComment: (id: string, comment: string) =>
      api.post(`/support/tickets/${id}/comments`, { comment }),
    assign: (id: string, assigneeId: string) =>
      api.patch(`/support/tickets/${id}/assign`, { assigneeId }),
    resolve: (id: string) => api.patch(`/support/tickets/${id}/resolve`)
  },

  // Analytics
  analytics: {
    dashboard: () => api.get('/analytics/dashboard'),
    customers: (params?: { period?: string }) => api.get('/analytics/customers', { ...params }),
    orders: (params?: { period?: string }) => api.get('/analytics/orders', { ...params }),
    revenue: (params?: { period?: string }) => api.get('/analytics/revenue', { ...params }),
    support: (params?: { period?: string }) => api.get('/analytics/support', { ...params })
  },

  // Reports
  reports: {
    generate: (type: string, params: any) => api.post(`/reports/${type}`, params),
    download: (id: string) => api.get(`/reports/${id}/download`),
    list: () => api.get('/reports')
  },

  // File Upload
  files: {
    upload: (file: File, type?: string) => 
      api.upload('/files/upload', file, type ? { type } : undefined),
    delete: (id: string) => api.delete(`/files/${id}`)
  }
}

// Error handling utilities
export function isApiError(error: any): error is ApiError {
  return error instanceof ApiError
}

export function getErrorMessage(error: any): string {
  if (isApiError(error)) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export function getErrorCode(error: any): string | undefined {
  if (isApiError(error)) {
    return error.code
  }
  return undefined
}

// Request interceptors (for adding auth tokens, logging, etc.)
export interface RequestInterceptor {
  (config: RequestInit): RequestInit | Promise<RequestInit>
}

export interface ResponseInterceptor {
  (response: Response): Response | Promise<Response>
}

class InterceptorManager {
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []

  addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor)
    return () => {
      const index = this.requestInterceptors.indexOf(interceptor)
      if (index > -1) {
        this.requestInterceptors.splice(index, 1)
      }
    }
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor)
    return () => {
      const index = this.responseInterceptors.indexOf(interceptor)
      if (index > -1) {
        this.responseInterceptors.splice(index, 1)
      }
    }
  }

  async processRequest(config: RequestInit): Promise<RequestInit> {
    let processedConfig = config
    for (const interceptor of this.requestInterceptors) {
      processedConfig = await interceptor(processedConfig)
    }
    return processedConfig
  }

  async processResponse(response: Response): Promise<Response> {
    let processedResponse = response
    for (const interceptor of this.responseInterceptors) {
      processedResponse = await interceptor(processedResponse)
    }
    return processedResponse
  }
}

export const interceptors = new InterceptorManager()

// Add default logging interceptor in development
if (process.env.NODE_ENV === 'development') {
  interceptors.addRequestInterceptor((config) => {
    console.log('API Request:', config)
    return config
  })

  interceptors.addResponseInterceptor((response) => {
    console.log('API Response:', response)
    return response
  })
}

// Utility for handling loading states
export function useApiCall() {
  return {
    async withLoading<T>(
      apiCall: () => Promise<T>,
      setLoading: (loading: boolean) => void
    ): Promise<T> {
      setLoading(true)
      try {
        return await apiCall()
      } finally {
        setLoading(false)
      }
    }
  }
}

// Cache manager for API responses
class ApiCache {
  private cache = new Map<string, { data: any; expiry: number }>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set(key: string, data: any, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL)
    this.cache.set(key, { data, expiry })
  }

  get(key: string): any | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() > cached.expiry) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  has(key: string): boolean {
    const cached = this.cache.get(key)
    if (!cached) return false

    if (Date.now() > cached.expiry) {
      this.cache.delete(key)
      return false
    }

    return true
  }
}

export const apiCache = new ApiCache()

// Helper for creating cache keys
export function createCacheKey(endpoint: string, params?: Record<string, any>): string {
  if (!params) return endpoint
  
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&')
  
  return `${endpoint}?${sortedParams}`
}