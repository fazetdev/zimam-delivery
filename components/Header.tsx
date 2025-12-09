'use client'

import { useLanguage } from '@/context/useLanguage'
import { Bell, MapPin } from 'lucide-react'

export default function Header() {
  const { language } = useLanguage()

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
      <div className="w-full px-4 py-3 md:max-w-md md:mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Z</span>
            </div>
            <div className="ml-3">
              <h1 className="font-bold text-gray-900">Zimam Delivery</h1>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin size={12} className="mr-1" />
                <span>{language === 'ar' ? 'دبي' : 'Dubai'}</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
