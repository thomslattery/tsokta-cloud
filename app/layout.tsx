import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SessionProvider from '@/components/providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tsokta Sprockets - Electronic Interface Solutions',
  description: 'Revolutionary electronic thingamajigs for seamless widget integration',
  keywords: 'electronic interfaces, widgets, sprockets, thingamajigs, system integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <SessionProvider>
          <Header />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}