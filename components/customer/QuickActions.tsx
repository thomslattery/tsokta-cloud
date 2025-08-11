'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Modal, { ModalBody, ModalFooter } from '@/components/ui/Modal'

export default function QuickActions() {
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <a 
            href="/docs" 
            className="block w-full text-center px-4 py-2 text-indigo-600 hover:text-indigo-500 font-medium border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            📚 Documentation
          </a>
          <a 
            href="/training" 
            className="block w-full text-center px-4 py-2 text-indigo-600 hover:text-indigo-500 font-medium border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            🎓 Training Videos
          </a>
          <a 
            href="/api-docs" 
            className="block w-full text-center px-4 py-2 text-indigo-600 hover:text-indigo-500 font-medium border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            ⚙️ API Reference
          </a>
        </div>
      </Card>

      {/* New Order Modal */}
      <Modal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        title="Place New Order"
        size="large"
      >
        <ModalBody>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h4 className="font-semibold">TS-Pro 3000</h4>
                <p className="text-sm text-gray-600 mb-2">Professional grade</p>
                <p className="font-bold text-indigo-600">$2,499</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="text-center">
                <div className="text-4xl mb-2">🔧</div>
                <h4 className="font-semibold">TS-Compact 1500</h4>
                <p className="text-sm text-gray-600 mb-2">Space-saving design</p>
                <p className="font-bold text-indigo-600">$899</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="text-center">
                <div className="text-4xl mb-2">🚀</div>
                <h4 className="font-semibold">TS-Enterprise X</h4>
                <p className="text-sm text-gray-600 mb-2">Enterprise solution</p>
                <p className="font-bold text-indigo-600">$4,999</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h5 className="font-semibold text-blue-900 mb-2">Need help choosing?</h5>
            <p className="text-blue-700 text-sm mb-3">
              Our sales team can help you find the perfect solution for your needs.
            </p>
            <Button variant="secondary" size="small">
              Schedule Consultation
            </Button>
          </div>
        </ModalBody>
        
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowOrderModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            setShowOrderModal(false)
            // Redirect to products page
            window.location.href = '/products'
          }}>
            Browse All Products
          </Button>
        </ModalFooter>
      </Modal>

      {/* Support Modal */}
      <Modal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        title="Live Chat Support"
        size="medium"
      >
        <ModalBody>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Live Chat</h3>
            <p className="text-gray-600 mb-6">
              Connect with our support team for immediate assistance with your Tsokta Sprockets products.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Average response time:</span>
                <span className="font-semibold text-green-600">< 2 minutes</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Support hours:</span>
                <span className="font-semibold">24/7</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>By starting a chat, you agree to our support terms and conditions.</p>
            </div>
          </div>
        </ModalBody>
        
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowSupportModal(false)}>
            Cancel
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Start Chat
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}y-3">
          <Button 
            className="w-full" 
            onClick={() => setShowOrderModal(true)}
          >
            Place New Order
          </Button>
          <Button variant="secondary" className="w-full">
            Device Settings
          </Button>
          <Button variant="secondary" className="w-full">
            Download Reports
          </Button>
          <Button variant="secondary" className="w-full">
            Billing & Invoices
          </Button>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-xl font-bold mb-4">Support</h3>
        <div className="space-y-3">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => setShowSupportModal(true)}
          >
            Live Chat
          </Button>
          <Button variant="secondary" className="w-full">
            Submit Ticket
          </Button>
          <Button variant="secondary" className="w-full">
            Knowledge Base
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4">Resources</h3>
        <div className="space-