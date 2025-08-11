'use client'

import { useOrders } from '@/hooks/useOrders'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function OrderHistory() {
  const { orders, isLoading } = useOrders()

  if (isLoading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </Card>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'shipped': return 'text-blue-600 bg-blue-100'
      case 'processing': return 'text-yellow-600 bg-yellow-100'
      case 'pending': return 'text-gray-600 bg-gray-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold">Recent Orders</h4>
        <Button variant="secondary" size="small">
          View All Orders
        </Button>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-4">Start exploring our products to place your first order.</p>
          <Button>Browse Products</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold text-lg">Order #{order.orderNumber}</h5>
                  <p className="text-gray-600 text-sm">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <div className="text-lg font-bold text-gray-900 mt-1">
                    {formatCurrency(order.total)}
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <h6 className="font-medium text-gray-900 mb-2">Items:</h6>
                <ul className="text-sm text-gray-600 space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.quantity}x {item.product.name}</span>
                      <span>{formatCurrency(item.product.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {order.trackingNumber && (
                <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-blue-900">Tracking Number:</span>
                      <span className="text-sm text-blue-700 ml-2 font-mono">{order.trackingNumber}</span>
                    </div>
                    <Button variant="secondary" size="small">
                      Track Package
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  {order.status === 'delivered' && order.deliveredAt && (
                    <span>Delivered on {formatDate(order.deliveredAt)}</span>
                  )}
                  {order.status === 'shipped' && order.shippedAt && (
                    <span>Shipped on {formatDate(order.shippedAt)}</span>
                  )}
                  {order.status === 'processing' && (
                    <span>Expected to ship within 2-3 business days</span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="secondary" size="small">
                    View Details
                  </Button>
                  {order.status === 'delivered' && (
                    <Button variant="secondary" size="small">
                      Reorder
                    </Button>
                  )}
                  {(order.status === 'pending' || order.status === 'processing') && (
                    <Button variant="danger" size="small">
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}