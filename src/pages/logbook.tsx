'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useLogbook } from '@/context/useLogbook'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import DeliveryCard, { Delivery } from '@/components/DeliveryCard'
import { Search, Filter, Calendar, Download, Plus, ChevronDown, BarChart3, TrendingUp, Clock, Star, Package, X, CheckCircle, ChevronRight, Zap, Target, Wallet } from 'lucide-react'

type FilterPlatform = 'all' | 'talabat' | 'jahez' | 'careem' | 'noon'

export default function LogbookPage() {
  const { language } = useLanguage()
  const { deliveries, addDelivery, deleteDelivery, getTodayDeliveries } = useLogbook()
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [platformFilter, setPlatformFilter] = useState<FilterPlatform>('all')
  const [selectedDate, setSelectedDate] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDelivery, setNewDelivery] = useState({
    customer: '',
    platform: 'talabat' as const,
    fee: 0,
    area: '',
    notes: ''
  })
  const [stats, setStats] = useState({ earnings: 0, averageTime: '0m' })

  useEffect(() => {
    setIsClient(true)
    // Simulate count-up animation
    const totalEarnings = deliveries.reduce((sum, d) => sum + d.fee, 0)
    const avgTime = deliveries.length > 0 ? '32m' : '0m'
    
    let count = 0
    const duration = 1000
    const steps = 60
    const increment = totalEarnings / steps
    
    const timer = setInterval(() => {
      count += increment
      if (count >= totalEarnings) {
        setStats({ earnings: totalEarnings, averageTime: avgTime })
        clearInterval(timer)
      } else {
        setStats({ earnings: Math.floor(count), averageTime: avgTime })
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-navy-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-gold-500 border-l-transparent rounded-full animate-spin mx-auto animation-delay-1000"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-300 animate-pulse">
            {language === 'ar' ? 'جاري تحميل سجل النخبة...' : 'Loading Elite Logbook...'}
          </p>
        </div>
      </div>
    )
  }

  const todayDeliveries = getTodayDeliveries()
  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = searchQuery === '' || 
      delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.notes.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesPlatform = platformFilter === 'all' || delivery.platform === platformFilter
    
    return matchesSearch && matchesPlatform
  })

  const handleAddDelivery = (e: React.FormEvent) => {
    e.preventDefault()
    if (newDelivery.customer && newDelivery.fee > 0 && newDelivery.area) {
      addDelivery(newDelivery)
      setNewDelivery({
        customer: '',
        platform: 'talabat',
        fee: 0,
        area: '',
        notes: ''
      })
      setShowAddForm(false)
    }
  }

  const totalEarnings = filteredDeliveries.reduce((sum, delivery) => sum + delivery.fee, 0)
  const averageDeliveryTime = filteredDeliveries.length > 0 ? '32m' : '0m'

  const platformColors = {
    talabat: 'from-orange-500 to-amber-500',
    jahez: 'from-red-500 to-pink-500',
    careem: 'from-emerald-500 to-green-500',
    noon: 'from-yellow-500 to-amber-400',
    other: 'from-purple-500 to-indigo-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-navy-900 dark:to-gray-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* CHANGE THIS CONTAINER - KEY FIX */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl shadow-2xl px-6 py-4 flex items-center justify-between rounded-b-3xl border-b border-white/20 dark:border-gray-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/30">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full border-2 border-white dark:border-navy-900"></div>
            </div>
            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                {language === 'ar' ? 'سجل النخبة' : 'Elite Logbook'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {language === 'ar' 
                  ? `${deliveries.length} رحلة مسجلة` 
                  : `${deliveries.length} recorded missions`
                }
              </p>
            </div>
          </div>
          <button className="hidden lg:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-bold rounded-2xl hover:from-teal-700 hover:to-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30">
            <TrendingUp size={20} />
            <span>{language === 'ar' ? 'تحليلات متقدمة' : 'Advanced Analytics'}</span>
          </button>
        </header>

        <main className="pb-24 lg:pb-8">
          {/* Hero Stats - Luxury Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative group bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-navy-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 dark:border-gray-800 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-xl">
                      <Wallet className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'إجمالي الأرباح' : 'Total Earnings'}
                      </p>
                      <p className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mt-2">
                        AED {stats.earnings.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full text-white text-sm font-bold flex items-center gap-1">
                    <TrendingUp size={16} />
                    <span>+18%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full animate-pulse" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>

            <div className="relative group bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-navy-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 dark:border-gray-800 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'متوسط الوقت' : 'Avg. Delivery Time'}
                      </p>
                      <p className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mt-2">
                        {averageDeliveryTime}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full text-white text-sm font-bold flex items-center gap-1">
                    <Zap size={16} />
                    <span>⚡</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' 
                    ? 'أسرع من ٩٢٪ من المنافسين'
                    : 'Faster than 92% of competitors'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* ... REST OF THE LUXURY LOGBOOK CODE CONTINUES ... */}
          {/* (Keep the rest of the luxury LogbookPage I provided earlier) */}
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 pb-6 lg:pb-0 bg-gradient-to-t from-white/95 to-transparent dark:from-navy-900/95 dark:to-transparent backdrop-blur-xl lg:hidden">
          <div className="max-w-7xl mx-auto px-4">
            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  )
}