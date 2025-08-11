import ProductGrid from '@/components/sections/ProductGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products - Tsokta Sprockets',
  description: 'Professional-grade electronic thingamajigs for every application',
}

export default function ProductsPage() {
  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Product Line</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional-grade electronic thingamajigs designed for seamless widget integration 
            and optimal sprocket performance across all applications.
          </p>
        </div>
        
        <ProductGrid />
      </div>
    </div>
  )
}