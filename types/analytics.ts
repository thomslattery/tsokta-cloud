export interface DashboardMetrics {
  revenue: RevenueMetrics
  orders: OrderMetrics
  customers: CustomerMetrics
  products: ProductMetrics
  support: SupportMetrics
  traffic: TrafficMetrics
  period: DateRange
  comparison?: {
    period: DateRange
    metrics: Partial<DashboardMetrics>
  }
}

export interface DateRange {
  start: Date
  end: Date
  label?: string
}

export interface RevenueMetrics {
  total: number
  growth: number
  average: number
  recurring: number
  oneTime: number
  byPeriod: TimeSeriesData[]
  byProduct: Array<{
    productId: string
    productName: string
    revenue: number
    percentage: number
  }>
  byCustomer: Array<{
    customerId: string
    customerName: string
    revenue: number
    orders: number
  }>
  byRegion: Array<{
    region: string
    revenue: number
    orders: number
    percentage: number
  }>
}

export interface OrderMetrics {
  total: number
  growth: number
  averageValue: number
  conversionRate: number
  fulfillmentRate: number
  returnRate: number
  byStatus: Record<string, number>
  byPeriod: TimeSeriesData[]
  topProducts: Array<{
    productId: string
    productName: string
    quantity: number
    revenue: number
  }>
}

export interface CustomerMetrics {
  total: number
  new: number
  active: number
  retained: number
  churnRate: number
  lifetimeValue: number
  acquisitionCost: number
  retentionRate: number
  byTier: Record<string, number>
  byRegion: Array<{
    region: string
    customers: number
    percentage: number
  }>
  cohortAnalysis: CohortData[]
}

export interface ProductMetrics {
  total: number
  published: number
  outOfStock: number
  lowStock: number
  views: number
  conversions: number
  topSelling: Array<{
    productId: string
    productName: string
    sales: number
    revenue: number
    views: number
    conversionRate: number
  }>
  categories: Array<{
    category: string
    products: number
    sales: number
    revenue: number
  }>
}

export interface SupportMetrics {
  totalTickets: number
  openTickets: number
  resolvedTickets: number
  avgResponseTime: number
  avgResolutionTime: number
  satisfactionScore: number
  firstResponseSLA: number
  resolutionSLA: number
  byPriority: Record<string, number>
  byCategory: Record<string, number>
  agentPerformance: Array<{
    agentId: string
    agentName: string
    ticketsHandled: number
    avgResponseTime: number
    satisfactionScore: number
  }>
}

export interface TrafficMetrics {
  visitors: number
  uniqueVisitors: number
  pageViews: number
  sessions: number
  bounceRate: number
  avgSessionDuration: number
  conversionRate: number
  topPages: Array<{
    path: string
    views: number
    uniqueViews: number
    avgTimeOnPage: number
    bounceRate: number
  }>
  referrers: Array<{
    source: string
    visitors: number
    percentage: number
  }>
  devices: Array<{
    type: string
    visitors: number
    percentage: number
  }>
}

export interface TimeSeriesData {
  date: string
  value: number
  label?: string
  metadata?: Record<string, any>
}

export interface CohortData {
  cohort: string
  size: number
  periods: Array<{
    period: number
    retained: number
    percentage: number
  }>
}

export interface AnalyticsFilter {
  dateRange: DateRange
  customers?: string[]
  products?: string[]
  categories?: string[]
  regions?: string[]
  channels?: string[]
  segments?: string[]
}

export interface ReportConfig {
  id: string
  name: string
  description?: string
  type: ReportType
  metrics: string[]
  dimensions: string[]
  filters: AnalyticsFilter
  schedule?: ReportSchedule
  format: 'pdf' | 'excel' | 'csv' | 'json'
  recipients: string[]
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export type ReportType = 
  | 'revenue'
  | 'orders'
  | 'customers'
  | 'products'
  | 'support'
  | 'traffic'
  | 'custom'

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  dayOfWeek?: number
  dayOfMonth?: number
  time: string
  timezone: string
  nextRun: Date
}

export interface ExportRequest {
  type: 'analytics' | 'orders' | 'customers' | 'products' | 'support'
  format: 'csv' | 'excel' | 'pdf'
  filters: Record<string, any>
  columns?: string[]
  dateRange?: DateRange
}

export interface AnalyticsEvent {
  id: string
  type: EventType
  properties: Record<string, any>
  userId?: string
  sessionId?: string
  timestamp: Date
  source?: string
  userAgent?: string
  ipAddress?: string
}

export type EventType = 
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'purchase'
  | 'search'
  | 'signup'
  | 'login'
  | 'logout'
  | 'support_ticket'
  | 'custom'

export interface Funnel {
  id: string
  name: string
  steps: FunnelStep[]
  conversionRate: number
  totalUsers: number
  dateRange: DateRange
}

export interface FunnelStep {
  name: string
  event: EventType
  conditions?: Record<string, any>
  users: number
  conversionRate: number
  dropoffRate: number
}

export interface Segment {
  id: string
  name: string
  description?: string
  conditions: SegmentCondition[]
  userCount: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SegmentCondition {
  field: string
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in' | 'not_in'
  value: any
}

export interface ABTest {
  id: string
  name: string
  description?: string
  status: 'draft' | 'running' | 'paused' | 'completed'
  variants: ABTestVariant[]
  metric: string
  significance: number
  confidenceLevel: number
  trafficAllocation: number
  startDate?: Date
  endDate?: Date
  results?: ABTestResults
  createdAt: Date
  updatedAt: Date
}

export interface ABTestVariant {
  id: string
  name: string
  description?: string
  allocation: number
  participants: number
  conversions: number
  conversionRate: number
}

export interface ABTestResults {
  winner?: string
  significance: number
  confidence: number
  uplift: number
  variants: Array<{
    variantId: string
    participants: number
    conversions: number
    conversionRate: number
    isWinner: boolean
  }>
}

export interface Goal {
  id: string
  name: string
  description?: string
  type: 'revenue' | 'conversion' | 'engagement' | 'retention'
  target: number
  current: number
  unit: string
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  startDate: Date
  endDate: Date
  isActive: boolean
  progress: number
  status: 'on_track' | 'at_risk' | 'off_track' | 'completed'
}

export interface Alert {
  id: string
  name: string
  metric: string
  condition: 'above' | 'below' | 'equals'
  threshold: number
  period: string
  recipients: string[]
  isActive: boolean
  lastTriggered?: Date
  createdAt: Date
  updatedAt: Date
}

export interface CustomMetric {
  id: string
  name: string
  description?: string
  query: string
  unit?: string
  format?: 'number' | 'currency' | 'percentage' | 'duration'
  category: string
  isPublic: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}