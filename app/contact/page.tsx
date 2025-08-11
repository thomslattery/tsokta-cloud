import { Metadata } from 'next'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Contact Us - Tsokta Sprockets',
  description: 'Get in touch with our sales and support teams',
}

export default function ContactPage() {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to revolutionize your widget integration? Get in touch with our team to discuss your thingamajig needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started Today</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="input-field"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="input-field"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-field"
                  placeholder="john.smith@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="input-field"
                  placeholder="Acme Widgets Corp"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Interest
                </label>
                <select id="interest" name="interest" className="input-field">
                  <option value="">Select a product...</option>
                  <option value="ts-pro-3000">TS-Pro 3000</option>
                  <option value="ts-compact-1500">TS-Compact 1500</option>
                  <option value="ts-enterprise-x">TS-Enterprise X</option>
                  <option value="custom-solution">Custom Solution</option>
                  <option value="consultation">General Consultation</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="input-field"
                  placeholder="Tell us about your widget integration needs..."
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>

              <p className="text-xs text-gray-500">
                By submitting this form, you agree to our{' '}
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>{' '}
                and{' '}
                <a href="/terms" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a>.
              </p>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Direct Contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">1-800-TSOKTA-1</p>
                    <p className="text-sm text-gray-500">Mon-Fri 8:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">sales@tsoktasprockets.com</p>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      123 Widget Way<br />
                      Sprocket City, SC 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Support */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Support</h3>
              
              <p className="text-gray-600 mb-4">
                Already a customer? Get technical support and assistance with your existing Tsokta Sprockets products.
              </p>
              
              <div className="space-y-3">
                <Button variant="secondary" className="w-full">
                  Open Support Ticket
                </Button>
                <Button variant="secondary" className="w-full">
                  Live Chat Support
                </Button>
                <Button variant="secondary" className="w-full">
                  Download Documentation
                </Button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Support Hours:</strong><br />
                  Monday - Friday: 7:00 AM - 8:00 PM EST<br />
                  Saturday: 9:00 AM - 5:00 PM EST<br />
                  Sunday: Emergency support only
                </p>
              </div>
            </Card>

            {/* Quick Links */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
              
              <div className="space-y-2">
                <a href="/products" className="block text-indigo-600 hover:text-indigo-500 font-medium">
                  → Browse Our Products
                </a>
                <a href="/docs" className="block text-indigo-600 hover:text-indigo-500 font-medium">
                  → Technical Documentation
                </a>
                <a href="/case-studies" className="block text-indigo-600 hover:text-indigo-500 font-medium">
                  → Customer Case Studies
                </a>
                <a href="/pricing" className="block text-indigo-600 hover:text-indigo-500 font-medium">
                  → Pricing Information
                </a>
                <a href="/demo" className="block text-indigo-600 hover:text-indigo-500 font-medium">
                  → Schedule a Demo
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}