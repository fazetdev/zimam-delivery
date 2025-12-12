'use client'

import { useLanguage } from '@/context/useLanguage'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: 'blue' | 'emerald' | 'purple' | 'amber' | 'rose' | 'violet'
  change?: string
  subtitle?: string
}

const gradients = {
  blue:    'from-blue-500 to-cyan-500',
  emerald: 'from-emerald-500 to-teal-600',
  purple:  'from-purple-500 to-pink-600',
  amber:   'from-amber-500 to-orange-500',
  rose:    'from-rose-500 to-pink-600',
  violet:  'from-violet-500 to-purple-600',
}

const ringColors = {
  blue:    'ring-blue-500/20',
  emerald: 'ring-emerald-500/20',
  purple:  'ring-purple-500/20',
  amber:   'ring-amber-500/20',
  rose:    'ring-rose-500/20',
  violet:  'ring-violet-500/20',
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
    <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
      {/* Animated gradient background blob */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
      
      {/* Floating glow ring */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${gradients[color]} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
      
      <div className="relative p-5 md:p-6">
        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-start justify-between gap-4`}>
          
          {/* Text Content */}
          <div className={isRTL ? 'text-right' : 'text-left'} dir={isRTL ? 'rtl' : 'ltr'}>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
              {title}
            </p>
            
            <p className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              {value}
            </p>
            
            {change && (
              <div className={`flex items-center gap-1 mt-3 ${change.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {change.startsWith('+') ? (
                  <TrendingUp size={16} className="font-bold" />
                ) : (
                  <TrendingDown size={16} className="font-bold" />
                )}
                <span className="text-sm font-bold">{change}</span>
              </div>
            )}
            
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 opacity-80">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Icon – Premium Edition */}
          <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${gradients[color]} shadow-xl ring-8 ${ringColors[color]} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
            <Icon size={28} className="text-white drop-shadow-lg" strokeWidth={2.5} />
            
            {/* Sparkle effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/30 animate-ping-slow" />
          </div>
        </div>
      </div>
      
      {/* Bottom shine line */}
      <div className={`h-1 bg-gradient-to-r ${gradients[color]} opacity-50 group-hover:opacity-100 transition-opacity`} />
    </div>
  )
}