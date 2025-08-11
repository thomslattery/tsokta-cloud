'use client'

import { useState, useEffect } from 'react'
import { Order } from '@/types/order'

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'TS-2025-001',
    status: 'delivered',
    total: 4998,
    subtotal: 4998,
    tax: 0,
    shipping: 0,
    items: [
      {
        product: {
          id: '1',
          name: 'TS-Pro 3000',
          model: 'TS-PRO-3K',
          description: 'Professional-grade thingamajig',
          price: 2499,
          category: 'professional',
          specifications: [
            { name: 'Processing Speed', value: '3.2', unit: 'GHz' }
          ],
          images: ['⚡'],
          inStock: true,
          stockQuantity: 50,
          features: ['Advanced AI feedback'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        quantity: 2,
        price: 2499
      }
    ],
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-20'),
    customerId: '1',
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'ST',
      zipCode: '12345',
      country: 'USA'
    },
    deliveredAt: new Date('2025-01-20'),
    trackingNumber: 'TS1234567890'
  },
  {
    id: '2',
    orderNumber: 'TS-2025-002',
    status: 'shipped',
    total: 4495,
    subtotal: 4495,
    tax: 0,
    shipping: 0,
    items: [
      {
        product: {
          id: '2',
          name: 'TS-Compact 1500',
          model: 'TS-COMP-1.5K',
          description: 'Compact solution',
          price: 899,
          category: 'compact',
          specifications: [
            { name: 'Processing Speed', value: '1.5', unit: 'GHz' }
          ],
          images: ['🔧'],
          inStock: true,
          stockQuantity: 100,
          features: ['Compact design'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        quantity: 5,
        price: 899
      }
    ],
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-22'),
    customerId: '1',
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'ST',
      zipCode: '12345',
      country: 'USA'
    },
    shippedAt: new Date('2025-01-22'),
    trackingNumber: 'TS0987654321'
  },
  {
    id: '3',
    orderNumber: 'TS-2025-003',
    status: 'processing',
    total: 4999,
    subtotal: 4999,
    tax: 0,
    shipping: 0,
    items: [
      {
        product: {
          id: '3',
          name: 'TS-Enterprise X',
          model: 'TS-ENT-X',
          description: 'Enterprise-level solution',
          price: 4999,
          category: 'enterprise',
          specifications: [
            { name: 'Processing Speed', value: '5.0', unit: 'GHz' }
          ],
          images: ['🚀'],
          inStock: true,
          stockQuantity: 25,
          features: ['AI-powered optimization'],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        quantity: 1,
        price: 4999
      }
    ],
    createdAt: new Date('2025-01-25'),
    updatedAt: new Date('2025-01-25'),
    customerId: '1',
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'ST',
      zipCode: '12345',
      country: 'USA'
    }
  }
]

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setOrders(mockOrders)
      } catch (err) {
        setError('Failed to fetch orders')
        console.error('Error fetching orders:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id)
  }

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status)
  }

  const cancelOrder = async (orderId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' as const, updatedAt: new Date() }
            : order
        )
      )
      return { success: true }
    } catch (err) {
      console.error('Error cancelling order:', err)
      return { success: false, error: 'Failed to cancel order' }
    }
  }

  const reorderItems = async (orderId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const originalOrder = getOrderById(orderId)
      if (!originalOrder) {
        throw new Error('Order not found')
      }

      // Create new order with same items
      const newOrder: Order = {
        ...originalOrder,
        id: String(orders.length + 1),
        orderNumber: `TS-2025-${String(orders.length + 1).padStart(3, '0')}`,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveredAt: undefined,
        shippedAt: undefined,
        trackingNumber: undefined
      }

      setOrders(prevOrders => [newOrder, ...prevOrders])
      return { success: true, orderId: newOrder.id }
    } catch (err) {
      console.error('Error reordering:', err)
      return { success: false, error: 'Failed to reorder items' }
    }
  }

  return { 
    orders, 
    isLoading, 
    error,
    getOrderById,
    getOrdersByStatus,
    cancelOrder,
    reorderItems
  }
}