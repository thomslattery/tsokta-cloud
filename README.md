# Tsokta Sprockets - Next.js Website

A modern, scalable website for Tsokta Sprockets featuring customer portals, admin dashboards, and product showcases.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
tsokta-sprockets/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── products/          # Products pages
│   ├── customer/          # Customer portal
│   └── admin/             # Admin dashboard
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   ├── customer/         # Customer components
│   └── admin/            # Admin components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & config
├── types/                # TypeScript types
└── styles/               # Global styles
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **State Management**: React Hooks + Context
- **Authentication**: Custom hook with localStorage (demo)

## 🎯 Key Features

### 🏠 Landing Page
- Hero section with animations
- Feature showcase
- Product highlights
- Responsive design

### 👤 Customer Portal
- Secure login system
- Account dashboard
- Order management
- Device monitoring
- Support integration

### ⚙️ Admin Dashboard
- Employee authentication
- Customer management
- Support ticket system
- Analytics overview
- Site administration

### 🔧 Products
- Product catalog
- Detailed specifications
- Shopping cart functionality
- Inventory tracking

## 🎨 Design System

### Colors
- **Primary**: Indigo (600, 700)
- **Secondary**: Gray (50-900)
- **Success**: Green (600, 700)
- **Warning**: Yellow (600, 700)
- **Error**: Red (600, 700)

### Components
- Reusable Button with variants
- Card components with hover effects
- Input fields with validation
- Loading states and animations

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
out/
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Environment Setup

Create `.env.local`:
```env
# Database (when implemented)
DATABASE_URL=""

# Authentication (when implemented)
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

# API Keys
STRIPE_SECRET_KEY=""
SENDGRID_API_KEY=""
```

## 📋 Development Workflow

1. **Setup**
   ```bash
   git clone <repository>
   cd tsokta-sprockets
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Type Checking**
   ```bash
   npm run type-check
   ```

4. **Linting**
   ```bash
   npm run lint
   ```

5. **Build & Test**
   ```bash
   npm run build
   npm start
   ```

## 🔐 Authentication Flow

Currently using demo authentication:
- Any email/password combination works
- User data stored in localStorage
- Session persists across browser refreshes

**For Production**: Replace with:
- NextAuth.js for OAuth providers
- JWT tokens for session management
- Database user storage
- Proper password hashing

## 📊 Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **CSS**: Tailwind CSS purging unused styles
- **Bundling**: SWC compiler for faster builds
- **Caching**: Proper cache headers for static assets

## 🧪 Testing Setup (Future)

```bash
# Add testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Add to package.json scripts
"test": "jest",
"test:watch": "jest --watch"
```

## 📈 Monitoring & Analytics (Future)

- **Error Tracking**: Sentry integration
- **Analytics**: Google Analytics 4
- **Performance**: Web Vitals monitoring
- **Uptime**: Status page integration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch