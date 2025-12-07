'use client'

import { useLanguage } from '@/context/useLanguage'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow'
  change?: string
  subtitle?: string
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  red: 'bg-red-100 text-red-600',
  yellow: 'bg-yellow-100 text-yellow-600',
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  change,
  subtitle,
}: StatsCardProps) {
  const { language } = useLanguage()
  const isRTL = language === 'ar'

  return (
    <div className="bg-white rounded-xl p-4 shadow border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between items-start`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
          
          {change && (
            <div className={`flex items-center mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {change.startsWith('+') ? (
                <TrendingUp size={12} className={isRTL ? 'ml-1' : 'mr-1'} />
              ) : (
                <TrendingDown size={12} className={isRTL ? 'ml-1' : 'mr-1'} />
              )}
              <span className="text-xs font-medium">{change}</span>
            </div>
          )}
          
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}

import { TrendingUp, TrendingDown } from 'lucide-react'
