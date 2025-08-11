'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Modal, { ModalBody, ModalFooter } from '@/components/ui/Modal'

const tickets = [
  {
    id: 'TS-2025-001',
    priority: 'High',
    title: 'TS-Pro 3000 connectivity issues',
    customer: 'Acme Widgets Corp',
    contact: 'John Smith',
    email: 'john@acmewidgets.com',
    time: '2 hours ago',
    status: 'open',
    description: 'Customer experiencing intermittent connectivity issues with their TS-Pro 3000 devices. Devices are dropping connection every 30-45 minutes.',
    category: 'Technical'
  },
  {
    id: 'TS-2025-002',
    priority: 'Medium',
    title: 'Software update request',
    customer: 'TechFlow Solutions',
    contact: 'Sarah Johnson',
    email: 'sarah@techflow.com',
    time: '4 hours ago',
    status: 'in-progress',
    description: 'Customer requesting update to latest firmware version for better performance.',
    category: 'Update'
  },
  {
    id: 'TS-2025-003',
    priority: 'Low',
    title: 'General inquiry about features',
    customer: 'Global Systems Inc',
    contact: 'Mike Chen',
    email: 'mike@globalsystems.com',
    time: '1 day ago',
    status: 'open',
    description: 'Customer asking about advanced configuration options for their TS-Enterprise X setup.',
    category: 'General'
  },
  {
    id: 'TS-2025-004',
    priority: 'High',
    title: 'Device not responding',
    customer: 'Innovation Labs',
    contact: 'Lisa Wong',
    email: 'lisa@innovlabs.com',
    time: '3 hours ago',
    status: 'open',
    description: 'TS-Compact 1500 device completely unresponsive. Customer unable to establish any connection.',
    category: 'Technical'
  }
]

export default function SupportTickets() {
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null)
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'border-red-200 bg-red-50 text-red-800'
      case 'Medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800'
      case 'Low': return 'border-gray-200 bg-gray-50 text-gray-800'
      default: return 'border-gray-200 bg-gray-50 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
    return matchesPriority && matchesStatus
  })

  const handleTicketAction = (action: string, ticketId: string) => {
    console.log(`${action} ticket ${ticketId}`)
    // In a real app, this would make API calls
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Support Tickets</h3>
        <Button size="small">New Ticket</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="input-field w-full sm:w-auto"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className={`p-4 border rounded-lg ${getPriorityColor(ticket.priority)}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-lg">{ticket.title}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('-', ' ')}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 bg-gray-200 text-gray-700 rounded">
                    {ticket.category}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Customer:</span> {ticket.customer}
                  </div>
                  <div>
                    <span className="font-medium">Contact:</span> {ticket.contact}
                  </div>
                  <div>
                    <span className="font-medium">Ticket ID:</span> {ticket.id}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {ticket.time}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">{ticket.description}</p>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                <Button 
                  size="small"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  View Details
                </Button>
                <Button 
                  size="small" 
                  variant="secondary"
                  onClick={() => handleTicketAction('assign', ticket.id)}
                >
                  Assign to Me
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600">Try adjusting your filter criteria.</p>
        </div>
      )}

      {/* Ticket Detail Modal */}
      <Modal
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        title={`Ticket Details - ${selectedTicket?.id}`}
        size="large"
      >
        {selectedTicket && (
          <>
            <ModalBody>
              <div className="space-y-6">
                {/* Ticket Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedTicket.title}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status.replace('-', ' ')}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedTicket.priority === 'High' ? 'bg-red-100 text-red-800' :
                        selectedTicket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedTicket.priority} Priority
                      </span>
                      <span className="text-xs font-medium px-2 py-1 bg-gray-200 text-gray-700 rounded">
                        {selectedTicket.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Company</label>
                        <p className="text-gray-900">{selectedTicket.customer}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Contact Person</label>
                        <p className="text-gray-900">{selectedTicket.contact}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900">{selectedTicket.email}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Ticket Information</h4>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Ticket ID</label>
                        <p className="text-gray-900 font-mono">{selectedTicket.id}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Created</label>
                        <p className="text-gray-900">{selectedTicket.time}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Assigned To</label>
                        <p className="text-gray-900">Unassigned</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{selectedTicket.description}</p>
                  </div>
                </div>

                {/* Response Section */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Response</h4>
                  <textarea
                    rows={4}
                    className="input-field"
                    placeholder="Type your response here..."
                  />
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="secondary" size="small">
                      Escalate
                    </Button>
                    <Button variant="secondary" size="small">
                      Forward
                    </Button>
                    <Button variant="secondary" size="small">
                      Add Note
                    </Button>
                    <Button variant="secondary" size="small">
                      Schedule Call
                    </Button>
                  </div>
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter>
              <Button variant="secondary" onClick={() => setSelectedTicket(null)}>
                Close
              </Button>
              <Button 
                variant="secondary"
                onClick={() => {
                  handleTicketAction('assign', selectedTicket.id)
                }}
              >
                Assign to Me
              </Button>
              <Button 
                onClick={() => {
                  handleTicketAction('resolve', selectedTicket.id)
                  setSelectedTicket(null)
                }}
              >
                Mark Resolved
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </Card>
  )
} Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full sm:w-auto"
        >
          <option value="all">All