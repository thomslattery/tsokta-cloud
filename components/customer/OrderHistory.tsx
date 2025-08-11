'use client'

import React, { useState, useEffect } from 'react'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Eye, 
  Download, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  RefreshCw
} from 'lucide-react'

interface OrderItem {
  id: string
  name: string
  sku: string
  quantity: number
  unitPrice: number
  totalPrice: number
  category: string
}

interface ShippingAddress {
  name: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

interface Order {
  id: string
  orderNumber: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
  orderDate: string
  shippedDate?: string
  deliveredDate?: string
  estimatedDelivery?: string
  totalAmount: number
  subtotal: number
  tax: number
  shipping: number
  discount?: number
  currency: string
  customer: {
    id: string
    name: string
    email: string
    phone?: string
  }
  shippingAddress: ShippingAddress
  billingAddress: ShippingAddress
  items: OrderItem[]
  trackingNumbers: string[]
  carrier?: string
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  notes?: string
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    orderNumber: 'TSK-2024-0001',
    status: 'delivered',
    orderDate: '2024-01-10T10:30:00Z',
    shippedDate: '2024-01-12T09:15:00Z',
    deliveredDate: '2024-01-15T14:20:00Z',
    totalAmount: 2847.50,
    subtotal: 2650.00,
    tax: 212.00,
    shipping: 85.50,
    discount: 100.00,
    currency: 'USD',
    customer: {
      id: 'CUST-001',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 123-4567'
    },
    shippingAddress: {
      name: 'Sarah Johnson',
      company: 'TechCorp Industries',
      address1: '123 Innovation Drive',
      address2: 'Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
      phone: '+1 (555) 123-4567'
    },
    billingAddress: {
      name: 'Sarah Johnson',
      company: 'TechCorp Industries',
      address1: '123 Innovation Drive',
      address2: 'Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    },
    items: [
      {
        id: 'ITEM-001',
        name: 'Advanced Widget Integrator Pro',
        sku: 'AWI-PRO-2024',
        quantity: 2,
        unitPrice: 899.99,
        totalPrice: 1799.98,
        category: 'Widget Integrators'
      },
      {
        id: 'ITEM-002',
        name: 'Electronic Interface Module',
        sku: 'EIM-STD-2024',
        quantity: 3,
        unitPrice: 283.34,
        totalPrice: 850.02,
        category: 'Electronic Interfaces'
      }
    ],
    trackingNumbers: ['1Z999AA1234567890', '1Z999AA1234567891'],
    carrier: 'UPS',
    paymentMethod: 'Credit Card (**** 4532)',
    paymentStatus: 'paid',
    notes: 'Rush delivery requested'
  },
  {
    id: 'ORD-002',
    orderNumber: 'TSK-2024-0002',
    status: 'shipped',
    orderDate: '2024-01-12T14:20:00Z',
    shippedDate: '2024-01-14T11:30:00Z',
    estimatedDelivery: '2024-01-18T17:00:00Z',
    totalAmount: 1245.75,
    subtotal: 1150.00,
    tax: 95.75,
    shipping: 0.00,
    currency: 'USD',
    customer: {
      id: 'CUST-002',
      name: 'Michael Chen',
      email: 'michael@startup.io',
      phone: '+1 (555) 987-6543'
    },
    shippingAddress: {
      name: 'Michael Chen',
      company: 'StartupCo',
      address1: '456 Tech Avenue',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'USA'
    },
    billingAddress: {
      name: 'Michael Chen',
      company: 'StartupCo',
      address1: '456 Tech Avenue',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'USA'
    },
    items: [
      {
        id: 'ITEM-003',
        name: 'Premium Sprocket System',
        sku: 'PSS-PREM-2024',
        quantity: 1,
        unitPrice: 1150.00,
        totalPrice: 1150.00,
        category: 'Sprocket Systems'
      }
    ],
    trackingNumbers: ['1Z999BB2345678901'],
    carrier: 'FedEx',
    paymentMethod: 'Purchase Order',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-003',
    orderNumber: 'TSK-2024-0003',
    status: 'processing',
    orderDate: '2024-01-14T09:45:00Z',
    totalAmount: 567.25,
    subtotal: 525.00,
    tax: 42.25,
    shipping: 0.00,
    currency: 'USD',
    customer: {
      id: 'CUST-003',
      name: 'Emily Rodriguez',
      email: 'emily@designstudio.com'
    },
    shippingAddress: {
      name: 'Emily Rodriguez',
      company: 'Creative Design Studio',
      address1: '789 Design Boulevard',
      city: 'Portland',
      state: 'OR',
      zipCode: '97205',
      country: 'USA'
    },
    billingAddress: {
      name: 'Emily Rodriguez',
      company: 'Creative Design Studio',
      address1: '789 Design Boulevard',
      city: 'Portland',
      state: 'OR',
      zipCode: '97205',
      country: 'USA'
    },
    items: [
      {
        id: 'ITEM-004',
        name: 'Custom Thingamajig Set',
        sku: 'CTS-CUST-2024',
        quantity: 5,
        unitPrice: 105.00,
        totalPrice: 525.00,
        category: 'Thingamajigs'
      }
    ],
    trackingNumbers: [],
    paymentMethod: 'Credit Card (**** 8901)',
    paymentStatus: 'paid'
  }
]

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-500" />
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-500" />
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'returned':
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return <Package className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'returned':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'failed':
        return 'text-red-600'
      case 'refunded':
        return 'text-orange-600'
      default:
        return 'text-gray-600'
    }
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    let matchesDate = true
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.orderDate)
      const now = new Date()
      
      switch (dateFilter) {
        case 'week':
          matchesDate = (now.getTime() - orderDate.getTime()) <= 7 * 24 * 60 * 60 * 1000
          break
        case 'month':
          matchesDate = (now.getTime() - orderDate.getTime()) <= 30 * 24 * 60 * 60 * 1000
          break
        case 'quarter':
          matchesDate = (now.getTime() - orderDate.getTime()) <= 90 * 24 * 60 * 60 * 1000
          break
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const refreshOrders = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
            <button
              onClick={refreshOrders}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders, customers, or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
            </select>
            
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Order</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Total</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Tracking</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-500">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">{formatDate(order.orderDate)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {order.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{formatCurrency(order.totalAmount)}</p>
                        <p className={`text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus.toUpperCase()}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {order.trackingNumbers.length > 0 ? (
                        <div>
                          <p className="text-sm text-gray-900">{order.carrier}</p>
                          <p className="text-xs text-gray-500">{order.trackingNumbers.length} tracking number{order.trackingNumbers.length !== 1 ? 's' : ''}</p>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Not shipped</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-90vh overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedOrder.status)}
                    <span className="capitalize">{selectedOrder.status.replace('-', ' ')}</span>
                  </div>
                  <span className="text-gray-500">Order #{selectedOrder.orderNumber}</span>
                  <span className="text-gray-500">Placed {formatDate(selectedOrder.orderDate)}</span>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Order Items */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">SKU: {item.sku} • {item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{formatCurrency(item.totalPrice)}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity} × {formatCurrency(item.unitPrice)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking Information */}
                {selectedOrder.trackingNumbers.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Tracking Information</h3>
                    <div className="space-y-2">
                      {selectedOrder.trackingNumbers.map((trackingNumber, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-purple-600" />
                            <div>
                              <p className="font-medium text-gray-900">{trackingNumber}</p>
                              <p className="text-sm text-gray-500">{selectedOrder.carrier}</p>
                            </div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Track Package
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                      {selectedOrder.shippingAddress.company && (
                        <p>{selectedOrder.shippingAddress.company}</p>
                      )}
                      <p>{selectedOrder.shippingAddress.address1}</p>
                      {selectedOrder.shippingAddress.address2 && (
                        <p>{selectedOrder.shippingAddress.address2}</p>
                      )}
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Billing Address</h3>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      <p className="font-medium">{selectedOrder.billingAddress.name}</p>
                      {selectedOrder.billingAddress.company && (
                        <p>{selectedOrder.billingAddress.company}</p>
                      )}
                      <p>{selectedOrder.billingAddress.address1}</p>
                      {selectedOrder.billingAddress.address2 && (
                        <p>{selectedOrder.billingAddress.address2}</p>
                      )}
                      <p>{selectedOrder.billingAddress.city}, {selectedOrder.billingAddress.state} {selectedOrder.billingAddress.zipCode}</p>
                      <p>{selectedOrder.billingAddress.country}</p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(selectedOrder.subtotal)}</span>
                    </div>
                    {selectedOrder.discount && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount:</span>
                        <span>-{formatCurrency(selectedOrder.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>{formatCurrency(selectedOrder.tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>{selectedOrder.shipping === 0 ? 'Free' : formatCurrency(selectedOrder.shipping)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
                      <span>Total:</span>
                      <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                    <p className="text-sm text-gray-600">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Payment Status</h3>
                    <span className={`text-sm font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Order Notes</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory