'use client'

import React, { useState } from 'react'
import { 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  FileText, 
  CreditCard, 
  Package, 
  Settings, 
  Clock, 
  Star, 
  AlertCircle,
  CheckCircle,
  Edit,
  Eye,
  Download,
  Plus,
  Search,
  Filter
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'active' | 'inactive' | 'pending'
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  lastContact: string
  totalOrders: number
  totalValue: number
  avatar?: string
}

interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  action: string
  color: string
  description: string
}

const mockCustomer: Customer = {
  id: 'CUST-001',
  name: 'Sarah Johnson',
  email: 'sarah@techcorp.com',
  phone: '+1 (555) 123-4567',
  company: 'TechCorp Industries',
  status: 'active',
  tier: 'gold',
  lastContact: '2024-01-15T10:30:00Z',
  totalOrders: 24,
  totalValue: 89750.00
}

const quickActions: QuickAction[] = [
  {
    id: 'contact-phone',
    label: 'Call Customer',
    icon: <Phone className="w-5 h-5" />,
    action: 'call',
    color: 'bg-green-100 text-green-700 hover:bg-green-200',
    description: 'Initiate a phone call'
  },
  {
    id: 'contact-email',
    label: 'Send Email',
    icon: <Mail className="w-5 h-5" />,
    action: 'email',
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    description: 'Compose new email'
  },
  {
    id: 'contact-message',
    label: 'Quick Message',
    icon: <MessageSquare className="w-5 h-5" />,
    action: 'message',
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    description: 'Send instant message'
  },
  {
    id: 'schedule-meeting',
    label: 'Schedule Meeting',
    icon: <Calendar className="w-5 h-5" />,
    action: 'schedule',
    color: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
    description: 'Book a meeting'
  },
  {
    id: 'create-ticket',
    label: 'Support Ticket',
    icon: <FileText className="w-5 h-5" />,
    action: 'ticket',
    color: 'bg-red-100 text-red-700 hover:bg-red-200',
    description: 'Create support ticket'
  },
  {
    id: 'view-orders',
    label: 'View Orders',
    icon: <Package className="w-5 h-5" />,
    action: 'orders',
    color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
    description: 'View order history'
  },
  {
    id: 'billing-info',
    label: 'Billing Info',
    icon: <CreditCard className="w-5 h-5" />,
    action: 'billing',
    color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    description: 'View billing details'
  },
  {
    id: 'edit-customer',
    label: 'Edit Profile',
    icon: <Edit className="w-5 h-5" />,
    action: 'edit',
    color: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    description: 'Edit customer info'
  }
]

const CustomerQuickActions: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(mockCustomer)
  const [showActionModal, setShowActionModal] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'silver':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'bronze':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleAction = (actionId: string) => {
    setShowActionModal(actionId)
    
    // Simulate action execution
    setTimeout(() => {
      setShowActionModal(null)
      // Here you would typically integrate with actual systems
      console.log(`Executing action: ${actionId} for customer: ${selectedCustomer.id}`)
    }, 2000)
  }

  const getActionModalContent = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId)
    if (!action) return null

    switch (actionId) {
      case 'contact-phone':
        return (
          <div className="text-center">
            <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Calling {selectedCustomer.name}</h3>
            <p className="text-gray-600 mb-4">{selectedCustomer.phone}</p>
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                <div className="w-8 h-8 bg-green-600 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        )
      
      case 'contact-email':
        return (
          <div className="text-center">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Opening Email Composer</h3>
            <p className="text-gray-600 mb-4">To: {selectedCustomer.email}</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        )
      
      case 'schedule':
        return (
          <div className="text-center">
            <Calendar className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Opening Calendar</h3>
            <p className="text-gray-600 mb-4">Scheduling meeting with {selectedCustomer.name}</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="text-center">
            {action.icon}
            <h3 className="text-lg font-semibold mb-2">{action.label}</h3>
            <p className="text-gray-600 mb-4">{action.description}</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Quick Actions</h1>
          <p className="text-gray-600">Streamlined tools for efficient customer management</p>
        </div>

        {/* Customer Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search customers by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selected Customer Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                <p className="text-gray-600">{selectedCustomer.company}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedCustomer.status)}`}>
                    {selectedCustomer.status.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTierColor(selectedCustomer.tier)}`}>
                    {selectedCustomer.tier.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Customer Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{selectedCustomer.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{selectedCustomer.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="font-medium text-gray-900">{selectedCustomer.totalOrders}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="font-medium text-gray-900">{formatCurrency(selectedCustomer.totalValue)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Last contact: {formatDate(selectedCustomer.lastContact)}</span>
            </div>
            <span>Customer ID: {selectedCustomer.id}</span>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className={`p-4 rounded-xl border-2 border-transparent transition-all duration-200 hover:scale-105 hover:shadow-md ${action.color}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3">
                    {action.icon}
                  </div>
                  <h4 className="font-medium mb-1">{action.label}</h4>
                  <p className="text-xs opacity-75">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Order #ORD-2847 completed</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Email sent: Product update notification</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Meeting scheduled: Q1 Review</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-6">
            {getActionModalContent(showActionModal)}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerQuickActions