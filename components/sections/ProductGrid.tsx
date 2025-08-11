'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import { Product } from '@/types/product'

const products: Product[] = [
  {
    id: '1',
    name: 'TS-Pro 3000',
    model: 'TS-PRO-3K',
    description: 'Professional-grade thingamajig with advanced feedback algorithms. Perfect for high-throughput widget environments.',
    price: 2499,
    category: 'professional',
    specifications: [
      { name: 'Processing Speed', value: '3.2', unit: 'GHz' },
      { name: 'Widget Capacity', value: '1000', unit: 'connections' },
      { name: 'Response Time', value: '< 1', unit: 'ms' }
    ],
    images: ['⚡'],
    inStock: true,
    stockQuantity: 50,
    features: ['Advanced AI feedback', 'Real-time analytics', '24/7 monitoring'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'TS-Compact 1500',
    model: 'TS-COMP-1.5K',
    description: 'Compact solution for small-scale operations. Reliable sprocket interfacing in a space-saving design.',
    price: 899,
    category: 'compact',
    specifications: [
      { name: 'Processing Speed', value: '1.5', unit: 'GHz' },
      { name: 'Widget Capacity', value: '250', unit: 'connections' },
      { name: 'Power Consumption', value: '15', unit: 'W' }
    ],
    images: ['🔧'],
    inStock: true,
    stockQuantity: 100,
    features: ['Compact design', 'Energy efficient', 'Easy installation'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'TS-Enterprise X',
    model: 'TS-ENT-X',
    description: 'Enterprise-level solution with AI-powered feedback systems. Handles complex multi-widget configurations.',
    price: 4999,
    category: 'enterprise',
    specifications: [
      { name: 'Processing Speed', value: '5.0', unit: 'GHz' },
      { name: 'Widget Capacity', value: '10000', unit: 'connections' },
      { name: 'Redundancy', value: 'Triple', unit: 'backup' }
    ],
    images: ['🚀'],
    inStock: true,
    stockQuantity: 25,
    features: ['AI-powered optimization', 'Enterprise security', 'Scalable architecture'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function ProductGrid() {
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  const handleAddToCart = async (productId: string) => {
    setAddingToCart(productId)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setAddingToCart(null)
    
    // In a real app, this would add to cart state/API
    console.log(`Added product ${productId} to cart`)
  }

  const getGradientColor = (category: string) => {
    switch (category) {
      case 'professional': return 'from-blue-400 to-blue-600'
      case 'compact': return 'from-green-400 to-green-600'
      case 'enterprise': return 'from-purple-400 to-purple-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Card key={product.id} hover>
          <div className={`h-48 bg-gradient-to-br ${getGradientColor(product.category)} rounded-lg mb-6 flex items-center justify-center`}>
            <div className="text-white text-6xl">{product.images[0]}</div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
          <p className="text-gray-600 mb-4 min-h-[3rem]">{product.description}</p>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Key Specifications:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {product.specifications.slice(0, 2).map((spec, index) => (
                <li key={index}>
                  <span className="font-medium">{spec.name}:</span> {spec.value} {spec.unit}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-3xl font-bold text-indigo-600 mb-4">
            {formatCurrency(product.price)}
          </div>
          
          <div className="mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
            </span>
          </div>
          
          <Button
            onClick={() => handleAddToCart(product.id)}
            disabled={!product.inStock}
            isLoading={addingToCart === product.id}
            className="w-full"
          >
            {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
          </Button>
        </Card>
      ))}
    </div>
  )
}