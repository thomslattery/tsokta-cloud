export interface SupportTicket {
  id: string
  ticketNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  subject: string
  description: string
  priority: TicketPriority
  status: TicketStatus
  category: TicketCategory
  subcategory?: string
  assignedTo?: string
  assignedToName?: string
  tags: string[]
  attachments: TicketAttachment[]
  comments: TicketComment[]
  resolution?: string
  resolutionTime?: number
  satisfactionRating?: number
  satisfactionComment?: string
  source: TicketSource
  relatedOrderId?: string
  relatedProductId?: string
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  closedAt?: Date
  firstResponseAt?: Date
  lastCustomerResponseAt?: Date
  lastAgentResponseAt?: Date
}

export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'

export type TicketStatus = 
  | 'open'
  | 'pending'
  | 'in_progress'
  | 'waiting_customer'
  | 'waiting_agent'
  | 'resolved'
  | 'closed'
  | 'cancelled'

export type TicketCategory = 
  | 'technical'
  | 'billing'
  | 'general'
  | 'feature_request'
  | 'bug_report'
  | 'account'
  | 'product_inquiry'
  | 'order_issue'
  | 'shipping'
  | 'return_refund'

export type TicketSource = 
  | 'email'
  | 'chat'
  | 'phone'
  | 'portal'
  | 'api'
  | 'social'

export interface TicketComment {
  id: string
  ticketId: string
  authorId: string
  authorName: string
  authorType: 'customer' | 'agent' | 'system'
  content: string
  isInternal: boolean
  attachments: TicketAttachment[]
  createdAt: Date
  updatedAt: Date
}

export interface TicketAttachment {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedBy: string
  uploadedAt: Date
}

export interface TicketTemplate {
  id: string
  name: string
  category: TicketCategory
  subject: string
  content: string
  tags: string[]
  isActive: boolean
  usageCount: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface KnowledgeBaseArticle {
  id: string
  title: string
  slug: string
  content: string
  summary?: string
  category: string
  subcategory?: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  isPublic: boolean
  viewCount: number
  helpfulCount: number
  notHelpfulCount: number
  attachments: TicketAttachment[]
  relatedArticles: string[]
  author: string
  authorName: string
  lastReviewedAt?: Date
  lastReviewedBy?: string
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
  isPublic: boolean
  sortOrder: number
  viewCount: number
  helpfulCount: number
  notHelpfulCount: number
  createdAt: Date
  updatedAt: Date
}

export interface SupportAgent {
  id: string
  userId: string
  name: string
  email: string
  avatar?: string
  title?: string
  department: string
  skills: string[]
  languages: string[]
  maxConcurrentTickets: number
  currentTicketCount: number
  averageResponseTime: number
  satisfactionRating: number
  ticketsResolved: number
  isAvailable: boolean
  lastActiveAt: Date
  workingHours: WorkingHours
  createdAt: Date
  updatedAt: Date
}

export interface WorkingHours {
  timezone: string
  schedule: {
    monday: TimeSlot[]
    tuesday: TimeSlot[]
    wednesday: TimeSlot[]
    thursday: TimeSlot[]
    friday: TimeSlot[]
    saturday: TimeSlot[]
    sunday: TimeSlot[]
  }
}

export interface TimeSlot {
  start: string // HH:mm format
  end: string   // HH:mm format
}

export interface SupportMetrics {
  period: {
    start: Date
    end: Date
  }
  totalTickets: number
  newTickets: number
  resolvedTickets: number
  closedTickets: number
  ticketsByPriority: Record<TicketPriority, number>
  ticketsByStatus: Record<TicketStatus, number>
  ticketsByCategory: Record<TicketCategory, number>
  averageResponseTime: number
  averageResolutionTime: number
  firstResponseSLA: number
  resolutionSLA: number
  customerSatisfaction: number
  agentPerformance: Array<{
    agentId: string
    agentName: string
    ticketsHandled: number
    avgResponseTime: number
    avgResolutionTime: number
    satisfactionRating: number
  }>
  escalationRate: number
  reopenRate: number
}

export interface EscalationRule {
  id: string
  name: string
  conditions: EscalationCondition[]
  actions: EscalationAction[]
  isActive: boolean
  priority: number
  createdAt: Date
  updatedAt: Date
}

export interface EscalationCondition {
  field: string
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains'
  value: string | number | boolean
}

export interface EscalationAction {
  type: 'assign_to' | 'change_priority' | 'add_tag' | 'send_notification' | 'change_status'
  value: string
  delay?: number // minutes
}

export interface SupportWorkflow {
  id: string
  name: string
  description?: string
  trigger: WorkflowTrigger
  conditions: WorkflowCondition[]
  actions: WorkflowAction[]
  isActive: boolean
  executionCount: number
  createdAt: Date
  updatedAt: Date
}

export interface WorkflowTrigger {
  event: 'ticket_created' | 'ticket_updated' | 'comment_added' | 'status_changed' | 'time_based'
  conditions?: Record<string, any>
}

export interface WorkflowCondition {
  field: string
  operator: string
  value: any
}

export interface WorkflowAction {
  type: 'assign_ticket' | 'change_status' | 'add_tag' | 'send_email' | 'create_task' | 'update_field'
  parameters: Record<string, any>
  delay?: number
}

export interface CreateTicketRequest {
  customerId?: string
  customerEmail?: string
  subject: string
  description: string
  priority?: TicketPriority
  category: TicketCategory
  subcategory?: string
  relatedOrderId?: string
  relatedProductId?: string
  attachments?: File[]
  tags?: string[]
  source?: TicketSource
}

export interface UpdateTicketRequest {
  subject?: string
  description?: string
  priority?: TicketPriority
  status?: TicketStatus
  category?: TicketCategory
  subcategory?: string
  assignedTo?: string
  tags?: string[]
  resolution?: string
}

export interface TicketSearch {
  query?: string
  customerId?: string
  assignedTo?: string
  priority?: TicketPriority[]
  status?: TicketStatus[]
  category?: TicketCategory[]
  source?: TicketSource[]
  tags?: string[]
  dateRange?: {
    start: Date
    end: Date
    field: 'created' | 'updated' | 'resolved' | 'closed'
  }
  hasAttachments?: boolean
  responseOverdue?: boolean
  resolutionOverdue?: boolean
}

export interface BulkTicketUpdate {
  ticketIds: string[]
  updates: {
    status?: TicketStatus
    priority?: TicketPriority
    assignedTo?: string
    category?: TicketCategory
    tags?: string[]
  }
  reason?: string
}

export interface TicketStats {
  total: number
  open: number
  pending: number
  inProgress: number
  resolved: number
  closed: number
  overdue: number
  unassigned: number
  averageResponseTime: number
  averageResolutionTime: number
  satisfactionRating: number
  byPriority: Record<TicketPriority, number>
  byCategory: Record<TicketCategory, number>
  recentTickets: SupportTicket[]
  escalatedTickets: SupportTicket[]
}