'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal, { ModalBody, ModalFooter } from '@/components/ui/Modal'

const customers = [
  { 
    id: '1',
    name: 'Acme Widgets Corp', 
    devices: 15, 
    status: 'active',
    contact: 'John Smith',
    email: 'john@acmewidgets.com',
    joinDate: '2023-06-15',
    lastActivity: '2025-01-10'
  },
  { 
    id: '2',
    name: 'TechFlow Solutions', 
    devices: 8, 
    status: 'active',
    contact: 'Sarah Johnson',
    email: 'sarah@techflow.com',
    joinDate: '2023-09-22',
    lastActivity: '2025-01-09'
  },
  { 
    id: '3',
    name: 'Global Systems Inc', 
    devices: 23, 
    status: 'active',
    contact: 'Mike Chen',
    email: 'mike@globalsystems.com',
    joinDate: '2023-03-10',
    lastActivity: '2025-01-11'
  },
  { 
    id: '4',
    name: 'Innovation Labs', 
    devices: 3, 
    status: 'inactive',
    contact: 'Lisa Wong',
    email: 'lisa@innovlabs.com',
    joinDate: '2024-11-05',
    lastActivity: '2024-12-15'
  }
]

export default function CustomerManagement() {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  const handleCustomerAction = (action: string, customerId: string) => {
    console.log(`${action} customer ${customerId}`)
    // In a real app, this would make API calls
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Customer Management</h3>
        <Button size="small">Add Customer</Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field w-full sm:w-auto"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Customer List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="font-semibold text-lg">{customer.name}</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                  {customer.status}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Contact:</span> {customer.contact}
                </div>
                <div>
                  <span className="font-medium">Devices:</span> {customer.devices}
                </div>
                <div>
                  <span className="font-medium">Joined:</span> {new Date(customer.joinDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Last Active:</span> {new Date(customer.lastActivity).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 ml-4">
              <Button 
                size="small" 
                variant="secondary"
                onClick={() => setSelectedCustomer(customer)}
              >
                View
              </Button>
              <Button 
                size="small"
                onClick={() => handleCustomerAction('manage', customer.id)}
              >
                Manage
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Customer Detail Modal */}
      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title={`Customer Details - ${selectedCustomer?.name}`}
        size="large"
      >
        {selectedCustomer && (
          <>
            <ModalBody>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Company Name</label>
                      <p className="text-gray-900">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Primary Contact</label>
                      <p className="text-gray-900">{selectedCustomer.contact}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCustomer.status)}`}>
                        {selectedCustomer.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Account Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Active Devices</label>
                      <p className="text-gray-900">{selectedCustomer.devices}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Join Date</label>
                      <p className="text-gray-900">{new Date(selectedCustomer.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Last Activity</label>
                      <p className="text-gray-900">{new Date(selectedCustomer.lastActivity).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="secondary" size="small">
                    View Orders
                  </Button>
                  <Button variant="secondary" size="small">
                    Device Status
                  </Button>
                  <Button variant="secondary" size="small">
                    Support History
                  </Button>
                  <Button variant="secondary" size="small">
                    Billing Info
                  </Button>
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter>
              <Button variant="secondary" onClick={() => setSelectedCustomer(null)}>
                Close
              </Button>
              <Button onClick={() => {
                handleCustomerAction('edit', selectedCustomer.id)
                setSelectedCustomer(null)
              }}>
                Edit Customer
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </Card>
  )
}