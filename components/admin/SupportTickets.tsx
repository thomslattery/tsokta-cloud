'use client'

import React, { useState, useEffect } from 'react'
import { Search, Filter, Plus, Eye, MessageSquare, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

interface SupportTicket {
  id: string
  title: string
  description: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  customer: {
    name: string
    email: string
    company?: string
  }
  assignedTo?: string
  createdAt: string
  updatedAt: string
  tags: string[]
  category: string
}

const mockTickets: SupportTicket[] = [
  {
    id: 'TSK-001',
    title: 'Widget Integration Not Working',
    description: 'Customer unable to integrate our sprockets with their existing widget system.',
    status: 'open',
    priority: 'high',
    customer: {
      name: 'John Smith',
      email: 'john@example.com',
      company: 'TechCorp Industries'
    },
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    tags: ['integration', 'widgets', 'technical'],
    category: 'Technical Support'
  },
  {
    id: 'TSK-002',
    title: 'Billing Inquiry - Invoice #12345',
    description: 'Customer has questions about charges on their recent invoice.',
    status: 'in-progress',
    priority: 'medium',
    customer: {
      name: 'Emily Davis',
      email: 'emily@startup.io',
      company: 'StartupCo'
    },
    assignedTo: 'Mike Chen',
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    tags: ['billing', 'invoice', 'payment'],
    category: 'Billing'
  },
  {
    id: 'TSK-003',
    title: 'Feature Request: Custom Thingamajig Colors',
    description: 'Request to add custom color options for thingamajig components.',
    status: 'open',
    priority: 'low',
    customer: {
      name: 'Alex Rodriguez',
      email: 'alex@designstudio.com',
      company: 'Creative Design Studio'
    },
    createdAt: '2024-01-13T11:20:00Z',
    updatedAt: '2024-01-13T11:20:00Z',
    tags: ['feature-request', 'customization', 'ui'],
    category: 'Feature Request'
  },
  {
    id: 'TSK-004',
    title: 'System Performance Issues',
    description: 'Customer experiencing slow response times with the electronic interface.',
    status: 'resolved',
    priority: 'urgent',
    customer: {
      name: 'Lisa Wang',
      email: 'lisa@enterprise.com',
      company: 'Enterprise Solutions Ltd'
    },
    assignedTo: 'David Park',
    createdAt: '2024-01-12T08:30:00Z',
    updatedAt: '2024-01-14T17:45:00Z',
    tags: ['performance', 'system', 'critical'],
    category: 'Technical Support'
  }
]

const SupportTickets: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [showNewTicketForm, setShowNewTicketForm] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'closed':
        return <XCircle className="w-4 h-4 text-gray-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
            <button
              onClick={() => setShowNewTicketForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Ticket
            </button>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tickets..."
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
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Ticket ID</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Title</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Priority</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Assigned To</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Updated</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm text-blue-600">{ticket.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="max-w-xs">
                        <h3 className="font-medium text-gray-900 truncate">{ticket.title}</h3>
                        <p className="text-sm text-gray-500 truncate mt-1">{ticket.category}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{ticket.customer.name}</p>
                        <p className="text-sm text-gray-500">{ticket.customer.company}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(ticket.status)}
                        <span className="capitalize text-sm">{ticket.status.replace('-', ' ')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900">
                        {ticket.assignedTo || 'Unassigned'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">
                        {formatDate(ticket.updatedAt)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Add Comment"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tickets found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Ticket Details Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-90vh overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{selectedTicket.title}</h2>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedTicket.status)}
                    <span className="capitalize">{selectedTicket.status.replace('-', ' ')}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority.toUpperCase()}
                  </span>
                  <span className="text-gray-500">#{selectedTicket.id}</span>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedTicket.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Customer</h3>
                    <p className="text-gray-700">{selectedTicket.customer.name}</p>
                    <p className="text-gray-500 text-sm">{selectedTicket.customer.email}</p>
                    {selectedTicket.customer.company && (
                      <p className="text-gray-500 text-sm">{selectedTicket.customer.company}</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Assignment</h3>
                    <p className="text-gray-700">{selectedTicket.assignedTo || 'Unassigned'}</p>
                    <p className="text-gray-500 text-sm">{selectedTicket.category}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTicket.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Created: {formatDate(selectedTicket.createdAt)}</span>
                  <span>Updated: {formatDate(selectedTicket.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SupportTickets