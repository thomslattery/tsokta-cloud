interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  fullScreen?: boolean
}

export default function LoadingSpinner({ 
  size = 'medium', 
  text = 'Loading...',
  fullScreen = true
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  const spinnerClasses = {
    small: 'border-2',
    medium: 'border-4',
    large: 'border-4'
  }

  if (!fullScreen) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className={cn(
          'animate-spin rounded-full border-gray-200 border-t-indigo-600',
          sizeClasses[size],
          spinnerClasses[size]
        )} />
        {text && <span className="ml-3 text-gray-600">{text}</span>}
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className={cn(
        'animate-spin rounded-full border-gray-200 border-t-indigo-600 mb-4',
        sizeClasses[size],
        spinnerClasses[size]
      )} />
      <p className="text-gray-600 text-lg">{text}</p>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}