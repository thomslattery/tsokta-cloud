import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Revolutionary <span className="text-blue-300">Electronic</span> Thingamajigs
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Seamlessly interface your widgets and sprockets with our intelligent feedback systems. 
                Get real-time responses based on your system inputs.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-blue-800/50 rounded-full px-4 py-2">
                <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Smart Integration</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-800/50 rounded-full px-4 py-2">
                <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Real-time Feedback</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-800/50 rounded-full px-4 py-2">
                <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">System Optimization</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#products"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Explore Products
              </Link>
              <Link 
                href="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors text-center"
              >
                Customer Portal
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="lg:flex justify-center">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 blur-2xl"></div>
              
              {/* Main visual */}
              <div className="relative bg-blue-800/30 rounded-2xl p-8 backdrop-blur-sm border border-blue-600/30">
                <div className="grid grid-cols-3 gap-4">
                  {/* Widget representations */}
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i}
                      className={`h-12 rounded-lg ${
                        i === 4 
                          ? 'bg-blue-400 animate-pulse' 
                          : 'bg-blue-600/50'
                      } flex items-center justify-center`}
                    >
                      {i === 4 ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ) : (
                        <div className="w-4 h-4 bg-blue-500/50 rounded"></div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Connection lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
                  <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}