'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Modal, { ModalBody, ModalFooter } from '@/components/ui/Modal'

export default function SiteManagement() {
  const [showReportsModal, setShowReportsModal] = useState(false)
  const [showDiagnosticsModal, setShowDiagnosticsModal] = useState(false)
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)

  const managementActions = [
    {
      title: 'Generate Reports',
      description: 'Create comprehensive reports on system performance, customer usage, and business metrics',
      icon: '📊',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => setShowReportsModal(true)
    },
    {
      title: 'System Diagnostics',
      description: 'Run system health checks and monitor infrastructure performance',
      icon: '🔧',
      color: 'bg-green-600 hover:bg-green-700',
      action: () => setShowDiagnosticsModal(true)
    },
    {
      title: 'User Analytics',
      description: 'View detailed analytics on user behavior and engagement patterns',
      icon: '📈',
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => setShowAnalyticsModal(true)
    },
    {
      title: 'Content Management',
      description: 'Manage website content, product information, and documentation',
      icon: '📝',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      action: () => console.log('Content management')
    },
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions across the platform',
      icon: '👥',
      color: 'bg-orange-600 hover:bg-orange-700',
      action: () => console.log('User management')
    },
    {
      title: 'Security Center',
      description: 'Monitor security events, manage access controls, and review audit logs',
      icon: '🔒',
      color: 'bg-red-600 hover:bg-red-700',
      action: () => console.log('Security center')
    }
  ]

  return (
    <Card>
      <h3 className="text-2xl font-bold mb-6">Site Management</h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementActions.map((action, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={action.action}
          >
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-3">{action.icon}</div>
              <h4 className="text-lg font-semibold text-gray-900">{action.title}</h4>
            </div>
            <p className="text-gray-600 text-sm mb-4">{action.description}</p>
            <Button 
              className={`w-full ${action.color}`}
              onClick={(e) => {
                e.stopPropagation()
                action.action()
              }}
            >
              Access {action.title}
            </Button>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick System Stats</h4>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">99.97%</div>
            <div className="text-sm text-blue-800">System Uptime</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">2.3s</div>
            <div className="text-sm text-green-800">Avg Load Time</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">1,247</div>
            <div className="text-sm text-purple-800">Active Sessions</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">847GB</div>
            <div className="text-sm text-orange-800">Data Processed</div>
          </div>
        </div>
      </div>

      {/* Reports Modal */}
      <Modal
        isOpen={showReportsModal}
        onClose={() => setShowReportsModal(false)}
        title="Generate Reports"
        size="large"
      >
        <ModalBody>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Available Reports</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'Customer Usage Report', description: 'Detailed usage statistics per customer', icon: '👥' },
                  { name: 'Revenue Analysis', description: 'Monthly and quarterly revenue breakdown', icon: '💰' },
                  { name: 'System Performance', description: 'Infrastructure and performance metrics', icon: '⚡' },
                  { name: 'Support Analytics', description: 'Support ticket trends and resolution times', icon: '🎫' }
                ].map((report, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 cursor-pointer transition-colors">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{report.icon}</span>
                      <h5 className="font-medium">{report.name}</h5>
                    </div>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Report Settings</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select className="input-field">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Custom range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select className="input-field">
                    <option>PDF</option>
                    <option>Excel (XLSX)</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowReportsModal(false)}>
            Cancel
          </Button>
          <Button>Generate Report</Button>
        </ModalFooter>
      </Modal>

      {/* Diagnostics Modal */}
      <Modal
        isOpen={showDiagnosticsModal}
        onClose={() => setShowDiagnosticsModal(false)}
        title="System Diagnostics"
        size="large"
      >
        <ModalBody>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">System Health</h4>
              <div className="space-y-3">
                {[
                  { component: 'Web Server', status: 'healthy', uptime: '99.97%' },
                  { component: 'Database', status: 'healthy', uptime: '99.95%' },
                  { component: 'Authentication Service', status: 'healthy', uptime: '100%' },
                  { component: 'File Storage', status: 'warning', uptime: '98.2%' },
                  { component: 'Email Service', status: 'healthy', uptime: '99.8%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        item.status === 'healthy' ? 'bg-green-500' : 
                        item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="font-medium">{item.component}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Uptime: {item.uptime}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Diagnostic Tools</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary">Run Full Diagnostic</Button>
                <Button variant="secondary">Check Database Health</Button>
                <Button variant="secondary">Test API Endpoints</Button>
                <Button variant="secondary">Memory Usage Report</Button>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowDiagnosticsModal(false)}>
            Close
          </Button>
          <Button>Download Diagnostic Report</Button>
        </ModalFooter>
      </Modal>

      {/* Analytics Modal */}
      <Modal
        isOpen={showAnalyticsModal}
        onClose={() => setShowAnalyticsModal(false)}
        title="User Analytics"
        size="xlarge"
      >
        <ModalBody>
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">1,247</div>
                <div className="text-sm text-indigo-800">Active Users</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">4.2min</div>
                <div className="text-sm text-green-800">Avg Session</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">67%</div>
                <div className="text-sm text-purple-800">Return Rate</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">2,847</div>
                <div className="text-sm text-orange-800">Page Views</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Popular Pages</h4>
              <div className="space-y-2">
                {[
                  { page: '/customer/dashboard', views: 1247, percentage: 45 },
                  { page: '/products', views: 847, percentage: 31 },
                  { page: '/admin/dashboard', views: 423, percentage: 15 },
                  { page: '/contact', views: 247, percentage: 9 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{item.page}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{item.views} views</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowAnalyticsModal(false)}>
            Close
          </Button>
          <Button>Export Analytics Data</Button>
        </ModalFooter>
      </Modal>
    </Card>
  )
}