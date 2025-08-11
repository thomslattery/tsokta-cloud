import { Product, ProductVariant } from './product'

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerEmail?: string
  customerName?: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod?: PaymentMethod
  paymentStatus: PaymentStatus
  shippingMethod?: ShippingMethod
  couponCode?: string
  notes?: string
  internalNotes?: string
  trackingNumbers: TrackingInfo[]
  estimatedDelivery?: Date
  fulfillmentStatus: FulfillmentStatus
  source: OrderSource
  referrer?: string
  tags: string[]
  priority: OrderPriority
  assignedTo?: string
  createdAt: Date
  updatedAt: Date
  confirmedAt?: Date
  shippedAt?: Date
  deliveredAt?: Date
  cancelledAt?: Date
  cancellationReason?: string
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'returned'

export type PaymentStatus = 
  | 'pending'
  | 'authorized'
  | 'captured'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded'

export type FulfillmentStatus = 
  | 'unfulfilled'
  | 'partially_fulfilled'
  | 'fulfilled'
  | 'shipped'
  | 'delivered'
  | 'returned'

export type OrderSource = 
  | 'website'
  | 'admin'
  | 'api'
  | 'phone'
  | 'email'
  | 'partner'

export type OrderPriority = 'low' | 'normal' | 'high' | 'urgent'

export interface OrderItem {
  id: string
  productId: string
  product: Product
  variantId?: string
  variant?: ProductVariant
  quantity: number
  unitPrice: number
  totalPrice: number
  originalPrice?: number
  discount?: number
  taxAmount?: number
  weight?: number
  sku: string
  title: string
  customizations?: Record<string, string>
  fulfillmentStatus: FulfillmentStatus
  trackingNumbers: string[]
  notes?: string
}

export interface Address {
  id?: string
  type?: 'shipping' | 'billing'
  firstName: string
  lastName: string
  company?: string
  street: string
  street2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault?: boolean
  instructions?: string
}

export interface PaymentMethod {
  id: string
  type: PaymentType
  provider: string
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  holderName?: string
  billingAddress?: Address
  isDefault?: boolean
}

export type PaymentType = 
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'wire_transfer'
  | 'check'
  | 'purchase_order'
  | 'net_terms'

export interface ShippingMethod {
  id: string
  name: string
  carrier: string
  service: string
  rate: number
  estimatedDays: number
  trackingUrl?: string
  description?: string
}

export interface TrackingInfo {
  id: string
  carrier: string
  trackingNumber: string
  url?: string
  status: TrackingStatus
  estimatedDelivery?: Date
  shippedAt?: Date
  deliveredAt?: Date
  lastUpdate: Date
  events: TrackingEvent[]
}

export type TrackingStatus = 
  | 'label_created'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed_delivery'
  | 'returned'
  | 'exception'

export interface TrackingEvent {
  status: TrackingStatus
  description: string
  location?: string
  timestamp: Date
}

export interface OrderTimeline {
  orderId: string
  events: OrderTimelineEvent[]
}

export interface OrderTimelineEvent {
  id: string
  type: 'status_change' | 'payment' | 'shipment' | 'note' | 'refund' | 'return'
  title: string
  description?: string
  status?: string
  userId?: string
  userName?: string
  metadata?: Record<string, any>
  timestamp: Date
  isPublic: boolean
}

export interface OrderRefund {
  id: string
  orderId: string
  amount: number
  reason: RefundReason
  description?: string
  items?: OrderRefundItem[]
  status: RefundStatus
  paymentId?: string
  processedAt?: Date
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export type RefundReason = 
  | 'customer_request'
  | 'defective_product'
  | 'wrong_item'
  | 'damaged_shipping'
  | 'not_as_described'
  | 'duplicate_order'
  | 'fraudulent'
  | 'other'

export type RefundStatus = 'pending' | 'approved' | 'processed' | 'failed' | 'cancelled'

export interface OrderRefundItem {
  orderItemId: string
  quantity: number
  amount: number
  reason?: string
}

export interface OrderReturn {
  id: string
  orderId: string
  items: OrderReturnItem[]
  reason: ReturnReason
  description?: string
  status: ReturnStatus
  returnAddress?: Address
  trackingNumber?: string
  receivedAt?: Date
  inspectedAt?: Date
  processedAt?: Date
  refundAmount?: number
  restockFee?: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export type ReturnReason = 
  | 'defective'
  | 'wrong_size'
  | 'wrong_item'
  | 'not_needed'
  | 'better_price'
  | 'damaged'
  | 'not_as_described'
  | 'other'

export type ReturnStatus = 
  | 'requested'
  | 'approved'
  | 'rejected'
  | 'shipped'
  | 'received'
  | 'inspected'
  | 'processed'
  | 'completed'

export interface OrderReturnItem {
  orderItemId: string
  quantity: number
  reason?: string
  condition?: 'new' | 'used' | 'damaged' | 'defective'
  restockable?: boolean
}

export interface OrderNote {
  id: string
  orderId: string
  content: string
  isInternal: boolean
  createdBy: string
  createdByName: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderSearch {
  orderNumber?: string
  customerId?: string
  customerEmail?: string
  status?: OrderStatus
  paymentStatus?: PaymentStatus
  fulfillmentStatus?: FulfillmentStatus
  priority?: OrderPriority
  source?: OrderSource
  dateRange?: {
    start: Date
    end: Date
  }
  amountRange?: {
    min: number
    max: number
  }
  productId?: string
  assignedTo?: string
  tags?: string[]
}

export interface CreateOrderRequest {
  customerId: string
  items: CreateOrderItemRequest[]
  shippingAddress: Omit<Address, 'id'>
  billingAddress?: Omit<Address, 'id'>
  paymentMethodId?: string
  shippingMethodId?: string
  couponCode?: string
  notes?: string
  source?: OrderSource
  priority?: OrderPriority
}

export interface CreateOrderItemRequest {
  productId: string
  variantId?: string
  quantity: number
  unitPrice?: number
  customizations?: Record<string, string>
}

export interface UpdateOrderRequest {
  status?: OrderStatus
  priority?: OrderPriority
  assignedTo?: string
  shippingAddress?: Address
  billingAddress?: Address
  notes?: string
  internalNotes?: string
  tags?: string[]
}

export interface OrderStats {
  total: number
  byStatus: Record<OrderStatus, number>
  byPriority: Record<OrderPriority, number>
  totalRevenue: number
  averageOrderValue: number
  conversionRate: number
  fulfillmentRate: number
  onTimeDeliveryRate: number
  returnRate: number
  topProducts: Array<{
    productId: string
    productName: string
    quantity: number
    revenue: number
  }>
  recentOrders: Order[]
  pendingOrders: number
  overdueOrders: number
}

export interface OrderAnalytics {
  period: {
    start: Date
    end: Date
  }
  orderCount: number
  revenue: number
  averageOrderValue: number
  conversionRate: number
  ordersByDay: Array<{
    date: string
    orders: number
    revenue: number
  }>
  ordersByStatus: Record<OrderStatus, number>
  ordersBySource: Record<OrderSource, number>
  topCustomers: Array<{
    customerId: string
    customerName: string
    orderCount: number
    totalSpent: number
  }>
  geographicDistribution: Array<{
    country: string
    state: string
    orderCount: number
    revenue: number
  }>
}

export interface OrderExport {
  format: 'csv' | 'xlsx' | 'pdf'
  filters: OrderSearch
  columns: string[]
  includeItems?: boolean
  includeAddresses?: boolean
  includeTracking?: boolean
}

export interface BulkOrderUpdate {
  orderIds: string[]
  updates: {
    status?: OrderStatus
    priority?: OrderPriority
    assignedTo?: string
    tags?: string[]
  }
  reason?: string
}