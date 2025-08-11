import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    default: 'Tsokta Sprockets - Electronic Interface Solutions',
    template: '%s | Tsokta Sprockets'
  },
  description: 'Revolutionary electronic thingamajigs for seamless widget integration. Leading provider of advanced sprocket systems and electronic interface solutions.',
  keywords: [
    'electronic interfaces',
    'widgets',
    'sprockets',
    'thingamajigs',
    'system integration',
    'electronic solutions',
    'widget integration',
    'industrial automation',
    'interface technology'
  ],
  authors: [{ name: 'Tsokta Sprockets' }],
  creator: 'Tsokta Sprockets',
  publisher: 'Tsokta Sprockets',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tsokta-sprockets.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tsokta Sprockets - Electronic Interface Solutions',
    description: 'Revolutionary electronic thingamajigs for seamless widget integration',
    url: 'https://tsokta-sprockets.com',
    siteName: 'Tsokta Sprockets',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tsokta Sprockets - Electronic Interface Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tsokta Sprockets - Electronic Interface Solutions',
    description: 'Revolutionary electronic thingamajigs for seamless widget integration',
    images: ['/twitter-image.jpg'],
    creator: '@tsokta',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all"
        >
          Skip to main content
        </a>
        
        {/* Page structure */}
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main id="main-content" className="flex-1 pt-16">
            {children}
          </main>
          
          <Footer />
        </div>
        
        {/* Scroll to top button */}
        <ScrollToTop />
        
        {/* Analytics and third-party scripts would go here */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}

// Scroll to top component
function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 invisible group z-40"
      style={{
        opacity: typeof window !== 'undefined' && window.scrollY > 300 ? 1 : 0,
        visibility: typeof window !== 'undefined' && window.scrollY > 300 ? 'visible' : 'hidden'
      }}
      aria-label="Scroll to top"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}