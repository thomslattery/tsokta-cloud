'use client'

import { useState, useEffect } from 'react'

export interface Customer {
  id: string
  name: string
  email: string
  company: string
  deviceCount: number
  status: 'active' | 'inactive' | 'suspended'
  contact: string
  joinDate: string
  lastActivity: string
  totalOrders: number
  totalSpent: number
  supportTickets: number
  tier: 'basic' | 'premium' | 'enterprise'
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@acmewidgets.com',
    company: 'Acme Widgets Corp',
    deviceCount: 15,
    status: 'active',
    contact: 'John Smith',
    joinDate: '2023-06-15',
    lastActivity: '2025-01-10',
    totalOrders: 8,
    totalSpent: 24750,
    supportTickets: 3,
    tier: 'premium'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@techflow.com',
    company: 'TechFlow Solutions',
    deviceCount: 8,
    status: 'active',
    contact: 'Sarah Johnson',
    joinDate: '2023-09-22',
    lastActivity: '2025-01-09',
    totalOrders: 5,
    totalSpent: 12450,
    supportTickets: 1,
    tier: 'basic'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@globalsystems.com',
    company: 'Global Systems Inc',
    deviceCount: 23,
    status: 'active',
    contact: 'Mike Chen',
    joinDate: '2023-03-10',
    lastActivity: '2025-01-11',
    totalOrders: 12,
    totalSpent: 89750,
    supportTickets: 5,
    tier: 'enterprise'
  },
  {
    id: '4',
    name: 'Lisa Wong',
    email: 'lisa@innovlabs.com',
    company: 'Innovation Labs',
    deviceCount: 3,
    status: 'inactive',
    contact: 'Lisa Wong',
    joinDate: '2024-11-05',
    lastActivity: '2024-12-15',
    totalOrders: 2,
    totalSpent: 3500,
    supportTickets: 2,
    tier: 'basic'
  },
  {
    id: '5',
    name: 'David Rodriguez',
    email: 'david@smarttech.com',
    company: 'SmartTech Solutions',
    deviceCount: 11,
    status: 'active',
    contact: 'David Rodriguez',
    joinDate: '2024-02-18',
    lastActivity: '2025-01-08',
    totalOrders: 6,
    totalSpent: 18900,
    supportTickets: 0,
    tier: 'premium'
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily@futureworks.com',
    company: 'FutureWorks Inc',
    deviceCount: 7,
    status: 'suspended',
    contact: 'Emily Davis',
    joinDate: '2024-08-12',
    lastActivity: '2024-12-20',
    totalOrders: 3,
    totalSpent: 7200,
    supportTickets: 8,
    tier: 'basic'
  }
]

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800))
        setCustomers(mockCustomers)
      } catch (err) {
        setError('Failed to fetch customers')
        console.error('Error fetching customers:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  const getCustomerById = (id: string) => {
    return customers.find(customer => customer.id === id)
  }

  const getCustomersByStatus = (status: Customer['status']) => {
    return customers.filter(customer => customer.status === status)
  }

  const getCustomersByTier = (tier: Customer['tier']) => {
    return customers.filter(customer => customer.tier === tier)
  }

  const searchCustomers = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return customers.filter(customer => 
      customer.name.toLowerCase().includes(lowercaseQuery) ||
      customer.email.toLowerCase().includes(lowercaseQuery) ||
      customer.company.toLowerCase().includes(lowercaseQuery)
    )
  }

  const updateCustomerStatus = async (customerId: string, newStatus: Customer['status']) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCustomers(prevCustomers => 
        prevCustomers.map(customer => 
          customer.id === customerId 
            ? { ...customer, status: newStatus, lastActivity: new Date().toISOString().split('T')[0] }
            : customer
        )
      )
      return { success: true }
    } catch (err) {
      console.error('Error updating customer status:', err)
      return { success: false, error: 'Failed to update customer status' }
    }
  }

  const addCustomer = async (customerData: Omit<Customer, 'id' | 'joinDate' | 'lastActivity' | 'totalOrders' | 'totalSpent' | 'supportTickets'>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newCustomer: Customer = {
        ...customerData,
        id: String(customers.length + 1),
        joinDate: new Date().toISOString().split('T')[0],
        lastActivity: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalSpent: 0,
        supportTickets: 0
      }

      setCustomers(prevCustomers => [newCustomer, ...prevCustomers])
      return { success: true, customer: newCustomer }
    } catch (err) {
      console.error('Error adding customer:', err)
      return { success: false, error: 'Failed to add customer' }
    }
  }

  const deleteCustomer = async (customerId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setCustomers(prevCustomers => 
        prevCustomers.filter(customer => customer.id !== customerId)
      )
      return { success: true }
    } catch (err) {
      console.error('Error deleting customer:', err)
      return { success: false, error: 'Failed to delete customer' }
    }
  }

  // Analytics functions
  const getCustomerStats = () => {
    const total = customers.length
    const active = customers.filter(c => c.status === 'active').length
    const inactive = customers.filter(c => c.status === 'inactive').length
    const suspended = customers.filter(c => c.status === 'suspended').length
    
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
    const avgOrderValue = customers.reduce((sum, c) => sum + c.totalOrders, 0) > 0 
      ? totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0) 
      : 0

    return {
      total,
      active,
      inactive,
      suspended,
      totalRevenue,
      avgOrderValue,
      activePercentage: total > 0 ? (active / total) * 100 : 0
    }
  }

  return { 
    customers, 
    isLoading, 
    error,
    getCustomerById,
    getCustomersByStatus,
    getCustomersByTier,
    searchCustomers,
    updateCustomerStatus,
    addCustomer,
    deleteCustomer,
    getCustomerStats
  }
}