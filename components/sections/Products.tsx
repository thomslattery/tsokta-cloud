export default function Products() {
  const products = [
    {
      name: "ThingaMatic Pro",
      category: "Premium Series",
      description: "Our flagship electronic thingamajig with advanced widget integration capabilities and real-time feedback processing.",
      features: [
        "Multi-widget compatibility",
        "Real-time data processing",
        "Advanced feedback algorithms",
        "Enterprise-grade security",
        "24/7 monitoring dashboard"
      ],
      price: "Starting at $2,499",
      badge: "Most Popular"
    },
    {
      name: "SprocketSync Standard",
      category: "Standard Series",
      description: "Perfect for medium-scale operations requiring reliable sprocket integration with essential feedback systems.",
      features: [
        "Standard widget support",
        "Basic feedback processing",
        "System health monitoring",
        "Email notifications",
        "Business hours support"
      ],
      price: "Starting at $1,299",
      badge: null
    },
    {
      name: "WidgetWise Enterprise",
      category: "Enterprise Series",
      description: "Ultimate solution for large-scale deployments with unlimited widget capacity and custom feedback algorithms.",
      features: [
        "Unlimited widget capacity",
        "Custom algorithm development",
        "Priority technical support",
        "Advanced analytics suite",
        "On-site installation support"
      ],
      price: "Contact for pricing",
      badge: "Enterprise"
    }
  ]

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Electronic Thingamajig Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of electronic interface solutions, 
            each designed to meet specific integration and feedback requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                product.badge === "Most Popular" ? "ring-2 ring-blue-600 scale-105" : ""
              }`}
            >
              {/* Badge */}
              {product.badge && (
                <div className={`absolute top-0 right-0 px-4 py-2 text-sm font-semibold text-white ${
                  product.badge === "Most Popular" ? "bg-blue-600" : "bg-gray-800"
                } rounded-bl-lg`}>
                  {product.badge}
                </div>
              )}

              <div className="p-8">
                {/* Product Header */}
                <div className="mb-6">
                  <div className="text-sm font-medium text-blue-600 mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    {product.price}
                  </div>
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    product.badge === "Most Popular"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}>
                    {product.price.includes("Contact") ? "Contact Sales" : "Get Quote"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Custom Integration?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our engineering team can develop custom thingamajig solutions tailored to your specific 
              widget integration requirements. From prototype to production, we'll work with you 
              every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Contact Engineering
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Download Specs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}