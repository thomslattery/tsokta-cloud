import { Status } from './index'

export interface Product {
  id: string
  name: string
  model: string
  description: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  category: ProductCategory
  subcategory?: string
  specifications: ProductSpecification[]
  features: string[]
  images: ProductImage[]
  documents: ProductDocument[]
  inStock: boolean
  stockQuantity: number
  lowStockThreshold?: number
  sku: string
  weight?: number
  dimensions?: ProductDimensions
  warranty: ProductWarranty
  compatibility: string[]
  tags: string[]
  status: Status
  isPublished: boolean
  isFeatured: boolean
  seoTitle?: string
  seoDescription?: string
  slug: string
  sortOrder: number
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
}

export type ProductCategory = 'professional' | 'compact' | 'enterprise' | 'accessories'

export interface ProductSpecification {
  name: string
  value: string
  unit?: string
  category?: string
  displayOrder?: number
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  caption?: string
  isPrimary: boolean
  sortOrder: number
  size: number
  width: number
  height: number
}

export interface ProductDocument {
  id: string
  name: string
  type: 'manual' | 'datasheet' | 'warranty' | 'installation' | 'support'
  url: string
  size: number
  version?: string
  language: string
  uploadedAt: Date
}

export interface ProductDimensions {
  length: number
  width: number
  height: number
  unit: 'mm' | 'cm' | 'in'
}

export interface ProductWarranty {
  duration: number
  unit: 'months' | 'years'
  type: 'limited' | 'full' | 'extended'
  description?: string
  terms?: string
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  sku: string
  price: number
  compareAtPrice?: number
  stockQuantity: number
  specifications: ProductSpecification[]
  images: ProductImage[]
  isDefault: boolean
  sortOrder: number
}

export interface ProductBundle {
  id: string
  name: string
  description: string
  products: ProductBundleItem[]
  price: number
  compareAtPrice: number
  savings: number
  isActive: boolean
  validFrom?: Date
  validUntil?: Date
}

export interface ProductBundleItem {
  productId: string
  quantity: number
  price: number
  isOptional: boolean
}

export interface ProductReview {
  id: string
  productId: string
  customerId: string
  customerName: string
  rating: number
  title: string
  comment: string
  isVerified: boolean
  isPublished: boolean
  helpfulCount: number
  reportCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  children?: ProductCategory[]
  productCount: number
  isActive: boolean
  sortOrder: number
  seoTitle?: string
  seoDescription?: string
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  variantId?: string
  variant?: ProductVariant
  quantity: number
  unitPrice: number
  totalPrice: number
  customizations?: Record<string, string>
  addedAt: Date
}

export interface Cart {
  id: string
  customerId?: string
  sessionId?: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  couponCode?: string
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface ProductSearch {
  query?: string
  category?: ProductCategory
  priceRange?: {
    min: number
    max: number
  }
  inStock?: boolean
  features?: string[]
  specifications?: Record<string, string>
  tags?: string[]
  sortBy?: 'name' | 'price' | 'rating' | 'popularity' | 'newest'
  sortOrder?: 'asc' | 'desc'
}

export interface ProductAnalytics {
  productId: string
  views: number
  uniqueViews: number
  cartAdds: number
  purchases: number
  revenue: number
  conversionRate: number
  averageRating: number
  reviewCount: number
  returnRate: number
  period: {
    start: Date
    end: Date
  }
}

export interface InventoryMovement {
  id: string
  productId: string
  variantId?: string
  type: 'in' | 'out' | 'adjustment' | 'reserved' | 'unreserved'
  quantity: number
  reason: string
  reference?: string
  userId: string
  notes?: string
  createdAt: Date
}

export interface StockAlert {
  id: string
  productId: string
  variantId?: string
  type: 'low_stock' | 'out_of_stock' | 'overstock'
  threshold: number
  currentQuantity: number
  isResolved: boolean
  notifiedAt?: Date
  resolvedAt?: Date
  createdAt: Date
}

export interface ProductPriceHistory {
  id: string
  productId: string
  variantId?: string
  price: number
  compareAtPrice?: number
  reason?: string
  userId: string
  effectiveFrom: Date
  effectiveTo?: Date
  createdAt: Date
}

export interface CreateProductRequest {
  name: string
  model: string
  description: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  category: ProductCategory
  specifications: Omit<ProductSpecification, 'displayOrder'>[]
  features: string[]
  stockQuantity: number
  sku: string
  weight?: number
  dimensions?: ProductDimensions
  warranty: ProductWarranty
  compatibility: string[]
  tags: string[]
  isPublished?: boolean
  isFeatured?: boolean
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  status?: Status
  lowStockThreshold?: number
  seoTitle?: string
  seoDescription?: string
}

export interface ProductStats {
  total: number
  published: number
  draft: number
  outOfStock: number
  lowStock: number
  byCategory: Record<ProductCategory, number>
  totalValue: number
  avgPrice: number
  topSelling: Product[]
  recentlyAdded: Product[]
}