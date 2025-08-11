'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye, 
  Filter, 
  Grid, 
  List, 
  Search,
  SlidersHorizontal,
  ChevronDown,
  Package,
  Zap,
  Settings,
  Layers
} from 'lucide-react'

interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

interface ProductSpec {
  name: string
  value: string
}

interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: string
  subcategory?: string
  sku: string
  price: number
  originalPrice?: number
  currency: string
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  images: ProductImage[]
  specifications: ProductSpec[]
  tags: string[]
  isNew: boolean
  isFeatured: boolean
  isOnSale: boolean
  manufacturer: string
}

const mockProducts: Product[] = [
  {
    id: 'PROD-001',
    name: 'Advanced Widget Integrator Pro',
    slug: 'advanced-widget-integrator-pro',
    description: 'Professional-grade widget integration system with advanced thingamajig compatibility and seamless sprocket connectivity.',
    shortDescription: 'Professional widget integration with advanced features',
    category: 'Widget Integrators',
    subcategory: 'Professional Series',
    sku: 'AWI-PRO-2024',
    price: 899.99,
    originalPrice: 1099.99,
    currency: 'USD',
    inStock: true,
    stockQuantity: 15,
    rating: 4.8,
    reviewCount: 127,
    images: [
      {
        id: 'IMG-001',
        url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop',
        alt: 'Advanced Widget Integrator Pro - Main View',
        isPrimary: true
      },
      {
        id: 'IMG-002',
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
        alt: 'Advanced Widget Integrator Pro - Side View',
        isPrimary: false
      }
    ],
    specifications: [
      { name: 'Integration Speed', value: '10 Gbps' },
      { name: 'Compatibility', value: 'Universal' },
      { name: 'Power Rating', value: '150W' }
    ],
    tags: ['professional', 'high-speed', 'universal'],
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    manufacturer: 'Tsokta Industries'
  },
  {
    id: 'PROD-002',
    name: 'Electronic Interface Module',
    slug: 'electronic-interface-module',
    description: 'Compact electronic interface module designed for seamless system integration with built-in sprocket management.',
    shortDescription: 'Compact module for seamless system integration',
    category: 'Electronic Interfaces',
    subcategory: 'Standard Series',
    sku: 'EIM-STD-2024',
    price: 283.34,
    currency: 'USD',
    inStock: true,
    stockQuantity: 42,
    rating: 4.6,
    reviewCount: 89,
    images: [
      {
        id: 'IMG-003',
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
        alt: 'Electronic Interface Module - Main View',
        isPrimary: true
      }
    ],
    specifications: [
      { name: 'Interface Type', value: 'USB-C/Ethernet' },
      { name: 'Operating Voltage', value: '12-24V DC' },
      { name: 'Dimensions', value: '10x5x2 cm' }
    ],
    tags: ['compact', 'versatile', 'standard'],
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    manufacturer: 'Tsokta Industries'
  },
  {
    id: 'PROD-003',
    name: 'Premium Sprocket System',
    slug: 'premium-sprocket-system',
    description: 'High-performance sprocket system with advanced bearing technology and precision-engineered thingamajig mounts.',
    shortDescription: 'High-performance sprocket with advanced bearing tech',
    category: 'Sprocket Systems',
    subcategory: 'Premium Series',
    sku: 'PSS-PREM-2024',
    price: 1150.00,
    currency: 'USD',
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 203,
    images: [
      {
        id: 'IMG-004',
        url: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=400&fit=crop',
        alt: 'Premium Sprocket System - Main View',
        isPrimary: true
      }
    ],
    specifications: [
      { name: 'Bearing Type', value: 'Precision Ball Bearing' },
      { name: 'Load Capacity', value: '500 kg' },
      { name: 'Material', value: 'Titanium Alloy' }
    ],
    tags: ['premium', 'high-capacity', 'precision'],
    isNew: false,
    isFeatured: true,
    isOnSale: false,
    manufacturer: 'Tsokta Industries'
  },
  {
    id: 'PROD-004',
    name: 'Custom Thingamajig Set',
    slug: 'custom-thingamajig-set',
    description: 'Versatile set of custom thingamajigs with multiple configuration options for specialized widget applications.',
    shortDescription: 'Versatile custom thingamajig set with multiple configs',
    category: 'Thingamajigs',
    subcategory: 'Custom Series',
    sku: 'CTS-CUST-2024',
    price: 105.00,
    currency: 'USD',
    inStock: true,
    stockQuantity: 156,
    rating: 4.4,
    reviewCount: 67,
    images: [
      {
        id: 'IMG-005',
        url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop',
        alt: 'Custom Thingamajig Set - Main View',
        isPrimary: true
      }
    ],
    specifications: [
      { name: 'Set Size', value: '12 pieces' },
      { name: 'Configuration Options', value: '24 different' },
      { name: 'Material', value: 'Polymer Composite' }
    ],
    tags: ['versatile', 'customizable', 'multi-use'],
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    manufacturer: 'Tsokta Industries'
  },
  {
    id: 'PROD-005',
    name: 'Industrial Widget Controller',
    slug: 'industrial-widget-controller',
    description: 'Heavy-duty widget controller designed for industrial applications with enhanced sprocket synchronization.',
    shortDescription: 'Heavy-duty controller for industrial applications',
    category: 'Widget Integrators',
    subcategory: 'Industrial Series',
    sku: 'IWC-IND-2024',
    price: 2250.00,
    originalPrice: 2500.00,
    currency: 'USD',
    inStock: true,
    stockQuantity: 3,
    rating: 4.7,
    reviewCount: 45,
    images: [
      {
        id: 'IMG-006',
        url: 'https://images.unsplash.com/photo-1565374876607-65b5aaf6ca19?w=400&h=400&fit=crop',
        alt: 'Industrial Widget Controller - Main View',
        isPrimary: true
      }
    ],
    specifications: [
      { name: 'Control Channels', value: '16' },
      { name: 'Power Output', value: '500W' },
      { name: 'Operating Temperature', value: '-40°C to 85°C' }
    ],
    tags: ['industrial', 'heavy-duty', 'high-power'],
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    manufacturer: 'Tsokta Industries'
  },
  {
    id: 'PROD-006',
    name: 'Micro Interface Adapter',
    slug: 'micro-interface-adapter',
    description: 'Ultra-compact interface adapter perfect for space-constrained applications with full thingamajig support.',
    shortDescription: 'Ultra-compact adapter for space-constrained apps',
    category: 'Electronic Interfaces',
    subcategory: 'Micro Series',
    sku: 'MIA-MICRO-2024',
    price: 67.50,
    currency: 'USD',
    inStock: false,
    stockQuantity: 0,
    rating: 4.3,
    reviewCount: 156,
    images: [
      {
        id: 'IMG-007',
        url: 'https://images.unsplash.com/photo-1593349480506-8433634cdcbe?w=400&h=400&fit=crop',
        alt: 'Micro Interface Adapter - Main View',
        isPrimary: true
      }
    ],
    specifications: [
      { name: 'Size', value: '15x10x3 mm' },
      { name: 'Weight', value: '2.3g' },
      { name: 'Interface', value: 'Micro-USB' }
    ],
    tags: ['micro', 'compact', 'lightweight'],
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    manufacturer: 'Tsokta Industries'
  }
]

type ViewMode = 'grid' | 'list'
type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest'

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000])
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const getPrimaryImage = (product: Product): ProductImage => {
    // Default fallback image
    const fallbackImage: ProductImage = {
      id: 'fallback',
      url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop',
      alt: `${product.name} - Product Image`,
      isPrimary: true
    }
    
    // Return fallback if no images array or empty
    if (!product.images || product.images.length === 0) {
      return fallbackImage
    }
    
    // Check for primary image first
    for (const image of product.images) {
      if (image && image.isPrimary) {
        return image
      }
    }
    
    // Fall back to first image if it exists
    const firstImage = product.images[0]
    if (firstImage) {
      return firstImage
    }
    
    // Final fallback
    return fallbackImage
  }

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, searchTerm, selectedCategory, sortBy, priceRange])

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const primaryImage = getPrimaryImage(product)
    const discountPercentage = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                NEW
              </span>
            )}
            {product.isOnSale && discountPercentage > 0 && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                -{discountPercentage}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`p-2 rounded-full shadow-md transition-colors ${
                favorites.has(product.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="p-2 bg-white text-gray-600 hover:text-blue-600 rounded-full shadow-md transition-colors"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              disabled={!product.inStock}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-blue-600 font-medium">{product.category}</span>
          </div>
          
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">SKU: {product.sku}</span>
          </div>

          {/* Stock Status */}
          {product.inStock && (
            <div className="mt-2 text-xs text-green-600">
              {product.stockQuantity > 10 
                ? 'In Stock' 
                : `Only ${product.stockQuantity} left`
              }
            </div>
          )}
        </div>
      </div>
    )
  }

  const ProductListItem: React.FC<{ product: Product }> = ({ product }) => {
    const primaryImage = getPrimaryImage(product)
    const discountPercentage = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-6 hover:shadow-lg transition-shadow">
        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover"
          />
          {product.isOnSale && discountPercentage > 0 && (
            <div className="absolute top-1 left-1">
              <span className="bg-red-500 text-white text-xs font-medium px-1 py-0.5 rounded">
                -{discountPercentage}%
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-xs text-blue-600 font-medium">{product.category}</span>
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
            </div>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`p-1 transition-colors ${
                favorites.has(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{product.shortDescription}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                href={`/products/${product.slug}`}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <button
                disabled={!product.inStock}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
              <p className="text-gray-600">Discover our complete range of electronic interface solutions</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-24 px-3 py-2 border border-gray-300 rounded text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-24 px-3 py-2 border border-gray-300 rounded text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {filteredAndSortedProducts.length} products</span>
            {searchTerm && (
              <span>Search results for "{searchTerm}"</span>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredAndSortedProducts.map(product => 
              viewMode === 'grid' 
                ? <ProductCard key={product.id} product={product} />
                : <ProductListItem key={product.id} product={product} />
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductGrid