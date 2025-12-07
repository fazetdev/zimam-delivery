'use client'

import { useLanguage } from '@/context/useLanguage'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  MapPin, 
  Wallet, 
  BookOpen, 
  Settings 
} from 'lucide-react'

const navItems = [
  { 
    id: 'home', 
    label: 'Dashboard', 
    href: '/', 
    icon: Home,
    arabicLabel: 'الرئيسية'
  },
  { 
    id: 'map', 
    label: 'Map', 
    href: '/map', 
    icon: MapPin,
    arabicLabel: 'الخريطة' 
  },
  { 
    id: 'wallet', 
    label: 'Wallet', 
    href: '/wallet', 
    icon: Wallet,
    arabicLabel: 'المحفظة'
  },
  { 
    id: 'logbook', 
    label: 'Logbook', 
    href: '/logbook', 
    icon: BookOpen,
    arabicLabel: 'السجل'
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    href: '/settings', 
    icon: Settings,
    arabicLabel: 'الإعدادات'
  },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { language } = useLanguage()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <div className="relative">
                <Icon 
                  size={22} 
                  className={isActive ? 'text-blue-600' : 'text-gray-500'}
                />
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </div>
              
              <span className="text-xs mt-1 font-medium">
                {language === 'ar' ? item.arabicLabel : item.label}
              </span>
              
              {isActive && (
                <div className="absolute top-0 w-full h-0.5 bg-blue-500" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
