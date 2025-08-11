// Site Configuration
export const SITE_CONFIG = {
  name: 'Tsokta Sprockets',
  description: 'Revolutionary Electronic Thingamajigs for Seamless Widget Integration',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://tsoktasprockets.com',
  tagline: 'Bridging the gap between systems and sprockets',
  version: '1.0.0',
  author: 'Tsokta Sprockets Team',
  contact: {
    phone: '1-800-TSOKTA-1',
    email: 'support@tsoktasprockets.com',
    sales: 'sales@tsoktasprockets.com',
    support: 'support@tsoktasprockets.com',
    address: {
      street: '123 Widget Way',
      city: 'Sprocket City',
      state: 'SC',
      zip: '12345',
      country: 'United States'
    }
  },
  social: {
    twitter: 'https://twitter.com/tsoktasprockets',
    linkedin: 'https://linkedin.com/company/tsokta-sprockets',
    github: 'https://github.com/tsokta-sprockets'
  }
} as const

// Product Categories
export const PRODUCT_CATEGORIES = {
  PROFESSIONAL: 'professional',
  COMPACT: 'compact',
  ENTERPRISE: 'enterprise',
  ACCESSORIES: 'accessories'
} as const

export type ProductCategory = typeof PRODUCT_CATEGORIES[keyof typeof PRODUCT_CATEGORIES]

// Order Statuses
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
} as const

export type OrderStatus = typeof ORDER_STATUSES[keyof typeof ORDER_STATUSES]

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer'
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

// Support Ticket Priorities
export const TICKET_PRIORITIES = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical'
} as const

export type TicketPriority = typeof TICKET_PRIORITIES[keyof typeof TICKET_PRIORITIES]

// Support Ticket Statuses
export const TICKET_STATUSES = {
  OPEN: 'open',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
} as const

export type TicketStatus = typeof TICKET_STATUSES[keyof typeof TICKET_STATUSES]

// Customer Tiers
export const CUSTOMER_TIERS = {
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise'
} as const

export type CustomerTier = typeof CUSTOMER_TIERS[keyof typeof CUSTOMER_TIERS]

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/signin',
    LOGOUT: '/api/auth/signout',
    CALLBACK: '/api/auth/callback',
    SESSION: '/api/auth/session'
  },
  USERS: '/api/users',
  CUSTOMERS: '/api/customers',
  ORDERS: '/api/orders',
  PRODUCTS: '/api/products',
  TICKETS: '/api/support/tickets',
  ANALYTICS: '/api/analytics',
  REPORTS: '/api/reports'
} as const

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  CONTACT: '/contact',
  ABOUT: '/about',
  PRICING: '/pricing',
  
  // Authentication
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  UNAUTHORIZED: '/unauthorized',
  
  // Customer Portal
  CUSTOMER: '/customer',
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  CUSTOMER_ORDERS: '/customer/orders',
  CUSTOMER_DEVICES: '/customer/devices',
  CUSTOMER_SUPPORT: '/customer/support',
  CUSTOMER_PROFILE: '/customer/profile',
  
  // Admin Portal
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_SUPPORT: '/admin/support',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',
  
  // Public Pages
  DOCS: '/docs',
  SUPPORT: '/support',
  PRIVACY: '/privacy',
  TERMS: '/terms'
} as const

// Error Messages
export const ERROR_MESSAGES = {
  GENERAL: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'Access denied. You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  
  // Authentication
  AUTH_REQUIRED: 'Please sign in to continue.',
  AUTH_INVALID: 'Invalid credentials. Please try again.',
  AUTH_EXPIRED: 'Your session has expired. Please sign in again.',
  
  // Forms
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
  PASSWORDS_DONT_MATCH: 'Passwords do not match.'
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  GENERAL: 'Operation completed successfully.',
  SAVED: 'Changes saved successfully.',
  CREATED: 'Created successfully.',
  UPDATED: 'Updated successfully.',
  DELETED: 'Deleted successfully.',
  
  // Orders
  ORDER_PLACED: 'Your order has been placed successfully.',
  ORDER_CANCELLED: 'Order cancelled successfully.',
  
  // Support
  TICKET_CREATED: 'Support ticket created successfully.',
  TICKET_UPDATED: 'Ticket updated successfully.',
  
  // Authentication
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'You have been signed out successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.'
} as const

// Application Limits
export const LIMITS = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // File Upload
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
  
  // Text Fields
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_COMMENT_LENGTH: 1000,
  MAX_TITLE_LENGTH: 100,
  
  // API Rate Limiting
  API_RATE_LIMIT: 100, // requests per minute
  AUTH_RATE_LIMIT: 5,  // login attempts per minute
  
  // Session
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  
  // Search
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_RESULTS: 50
} as const

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: true,
  ENABLE_CHAT_SUPPORT: true,
  ENABLE_ADVANCED_SEARCH: true,
  ENABLE_BULK_OPERATIONS: true,
  ENABLE_EXPORT_FEATURES: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_BETA_FEATURES: false
} as const

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: 'indigo',
    SECONDARY: 'gray',
    SUCCESS: 'green',
    WARNING: 'yellow',
    ERROR: 'red',
    INFO: 'blue'
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px'
  }
} as const

// Business Rules
export const BUSINESS_RULES = {
  // Minimum order amounts
  MIN_ORDER_AMOUNT: 100,
  FREE_SHIPPING_THRESHOLD: 500,
  
  // Discounts
  BULK_DISCOUNT_THRESHOLD: 10, // devices
  BULK_DISCOUNT_PERCENTAGE: 15,
  
  // Support
  SLA_RESPONSE_TIME: {
    HIGH: 2 * 60 * 60 * 1000,    // 2 hours
    MEDIUM: 8 * 60 * 60 * 1000,  // 8 hours
    LOW: 24 * 60 * 60 * 1000     // 24 hours
  },
  
  // Customer Tiers
  TIER_THRESHOLDS: {
    PREMIUM: 10000,   // $10k annual spend
    ENTERPRISE: 50000 // $50k annual spend
  }
} as const

// Okta Configuration
export const OKTA_CONFIG = {
  GROUPS: {
    ADMIN: 'Tsokta-Admins',
    EMPLOYEE: 'Tsokta-Employees',
    CUSTOMER: 'Tsokta-Customers'
  },
  SCOPES: ['openid', 'email', 'profile', 'groups'],
  CLAIMS: {
    ROLE: 'groups',
    COMPANY: 'company',
    DEPARTMENT: 'department'
  }
} as const

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM d, yyyy',
  LONG: 'MMMM d, yyyy',
  WITH_TIME: 'MMM d, yyyy h:mm a',
  ISO: 'yyyy-MM-dd',
  TIME_ONLY: 'h:mm a'
} as const

// Regular Expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  CREDIT_CARD: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
  ORDER_NUMBER: /^TS-\d{4}-\d{3}$/
} as const

// Export all constants as a single object for convenience
export const CONSTANTS = {
  SITE_CONFIG,
  PRODUCT_CATEGORIES,
  ORDER_STATUSES,
  USER_ROLES,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  CUSTOMER_TIERS,
  API_ENDPOINTS,
  ROUTES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LIMITS,
  FEATURE_FLAGS,
  THEME_CONFIG,
  BUSINESS_RULES,
  OKTA_CONFIG,
  DATE_FORMATS,
  REGEX_PATTERNS
} as const