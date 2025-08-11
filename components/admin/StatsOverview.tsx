import Card from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

const stats = [
  {
    title: 'Active Customers',
    value: '247',
    change: '+12%',
    changeType: 'positive' as const,
    icon: '👥',
    bgColor: 'bg-indigo-600',
    description: 'Total active customer accounts'
  },
  {
    title: 'Devices Deployed',
    value: '1,483',
    change: '+8%',
    changeType: 'positive' as const,
    icon: '⚡',
    bgColor: 'bg-green-600',
    description: 'Active devices across all customers'
  },
  {
    title: 'Open Tickets',
    value: '12',
    change: '-3',
    changeType: 'negative' as const,
    icon: '🎫',
    bgColor: 'bg-yellow-600',
    description: 'Support tickets requiring attention'
  },
  {
    title: 'Monthly Revenue',
    value: formatCurrency(847000),
    change: '+15%',
    changeType: 'positive' as const,
    icon: '💰',
    bgColor: 'bg-purple-600',
    description: 'Revenue for current month'
  }
]

const additionalMetrics = [
  {
    title: 'System Uptime',
    value: '99.97%',
    description: 'Last 30 days',
    color: 'text-green-600'
  },
  {
    title: 'Avg Response Time',
    value: '2.3 min',
    description: 'Support tickets',
    color: 'text-blue-600'
  },
  {
    title: 'Customer Satisfaction',
    value: '4.8/5',
    description: 'Based on recent surveys',
    color: 'text-purple-600'
  },
  {
    title: 'Active Integrations',
    value: '1,247',
    description: 'Widget connections',
    color: 'text-indigo-600'
  }
]

export default function StatsOverview() {
  return (
    <div className="space-y-8">
      {/* Main KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <div className="flex items-center">
                  <span className={`text-sm font-medium flex items-center ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7l-9.2 9.2M7 7v10h10" />
                      </svg>
                    )}
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center text-white text-2xl ml-4`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Metrics */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                {metric.value}
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {metric.title}
              </div>
              <div className="text-xs text-gray-500">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <h4 className="font-semibold text-gray-900 mb-3">Top Performing Product</h4>
          <div className="flex items-center space-x-3">
            <div className="text-2xl">⚡</div>
            <div>
              <div className="font-medium">TS-Pro 3000</div>
              <div className="text-sm text-gray-600">127 units sold this month</div>
            </div>
          </div>
        </Card>

        <Card>
          <h4 className="font-semibold text-gray-900 mb-3">Busiest Support Agent</h4>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-indigo-600">JS</span>
            </div>
            <div>
              <div className="font-medium">Jane Smith</div>
              <div className="text-sm text-gray-600">47 tickets resolved</div>
            </div>
          </div>
        </Card>

        <Card>
          <h4 className="font-semibold text-gray-900 mb-3">Newest Customer</h4>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-green-600">TC</span>
            </div>
            <div>
              <div className="font-medium">TechFlow Corp</div>
              <div className="text-sm text-gray-600">Joined 2 days ago</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}