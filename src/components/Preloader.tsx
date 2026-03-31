'use client'

import { useEffect, useState } from 'react'
import { Home, Building2 } from 'lucide-react'

const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Simulate loading time - you can adjust this based on your needs
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex flex-col items-center justify-center space-y-8 px-4">
        {/* Animated House Icons */}
        <div className="relative">
          {/* Main House Icon */}
          <div className="relative z-10 animate-bounce">
            <Home className="h-20 w-20 text-blue-600 dark:text-blue-400 md:h-24 md:w-24 lg:h-28 lg:w-28" strokeWidth={1.5} />
          </div>
          
          {/* Decorative Buildings */}
          <div className="absolute -left-12 top-4 animate-pulse opacity-50 sm:-left-16 sm:top-6">
            <Building2 className="h-12 w-12 text-blue-400 dark:text-blue-500 md:h-14 md:w-14" strokeWidth={1.5} />
          </div>
          <div className="absolute -right-12 top-4 animate-pulse opacity-50 sm:-right-16 sm:top-6" style={{ animationDelay: '0.5s' }}>
            <Building2 className="h-12 w-12 text-blue-400 dark:text-blue-500 md:h-14 md:w-14" strokeWidth={1.5} />
          </div>
          
          {/* Pulsing Circle Background */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-blue-300 opacity-20 dark:bg-blue-500 md:h-40 md:w-40"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4 text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 sm:text-2xl md:text-3xl">
            Finding Your Dream Home
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            Please wait while we load...
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 sm:w-80">
          <div className="h-2 animate-[loading_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
        </div>

        {/* Dots Animation */}
        <div className="flex space-x-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0s' }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-700" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}
export default Preloader;