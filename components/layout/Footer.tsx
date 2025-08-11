import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Facebook } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-blue-400 mb-2">Tsokta Sprockets</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Revolutionary electronic interface solutions for seamless widget integration. 
                Leading the industry in sprocket technology and thingamajig innovation.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                123 Innovation Drive, Tech Valley, CA 94043
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="w-4 h-4 mr-2 text-blue-400" />
                (555) 123-SPROCKET
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-blue-400" />
                info@tsokta-sprockets.com
              </div>
            </div>
          </div>

          {/* Products & Solutions */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/electronic-interfaces" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Electronic Interfaces
                </Link>
              </li>
              <li>
                <Link href="/products/widget-integrators" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Widget Integrators
                </Link>
              </li>
              <li>
                <Link href="/products/sprocket-systems" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Sprocket Systems
                </Link>
              </li>
              <li>
                <Link href="/products/thingamajigs" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Advanced Thingamajigs
                </Link>
              </li>
              <li>
                <Link href="/products/custom-solutions" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Custom Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/support/tickets" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Submit Ticket
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Training Resources
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  News & Press
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Social Media Links */}
            <div>
              <h5 className="text-sm font-semibold mb-3 text-white">Follow Us</h5>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/tsokta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/tsokta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Connect on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/tsokta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="View our GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/tsokta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Like us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <h4 className="text-lg font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm">
                Get the latest updates on new products and industry insights.
              </p>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Tsokta Sprockets. All rights reserved.
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <ul className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
                <li>
                  <Link href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/cookies" className="text-gray-400 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer