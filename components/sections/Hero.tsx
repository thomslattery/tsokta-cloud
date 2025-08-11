import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-float">
            Tsokta Sprockets
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Revolutionary Electronic Thingamajigs for Seamless Widget Integration
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto opacity-80">
            Our cutting-edge electronic interfaces bridge the gap between your systems and sprockets, 
            delivering intelligent feedback and optimal performance for all your widget connectivity needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="secondary" size="large">
                Explore Products
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="large">
                Customer Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}