'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useLogbook } from '@/context/useLogbook'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import DeliveryCard, { Delivery } from '@/components/DeliveryCard'
import { Search, Filter, Calendar, Download, Plus, ChevronDown, BarChart3, TrendingUp, Clock, Star, Package } from 'lucide-react'

type FilterPlatform = 'all' | 'talabat' | 'jahez' | 'careem' | 'noon'

// Custom Color/Style Classes for Logbook Page
const customColors = {
  primary: 'text-blue-600',
  secondary: 'bg-gray-100 text-gray-700',
  card: 'bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl',
  input: 'w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors',
  buttonPrimary: 'px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/50',
  buttonSecondary: 'px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium',
  gradientSuccess: 'bg-gradient-to-br from-emerald-500 to-green-400',
  gradientOcean: 'bg-gradient-to-br from-blue-500 to-cyan-400',
  gradientSand: 'bg-gradient-to-br from-amber-400 to-yellow-300',
}

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

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-500 border-l-transparent rounded-full animate-spin mx-auto animation-delay-1000"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-700 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            {language === 'ar' ? 'جاري تحميل سجل الرحلات...' : 'Loading Logbook...'}
          </p>
        </div>
      </div>
    )
  }

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
  // Assuming a static avg time for demonstration, replace with actual calculation if available
  const averageDeliveryTime = filteredDeliveries.length > 0 ? '32m' : '0m'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Background decorative elements - Enhanced for responsiveness and visual appeal */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto"> {/* Main container now allows wide screen expansion */}
        <Header />

        <main className="pb-24 px-4 pt-6 md:pt-8">
          {/* Page Header - Responsive layout */}
          <div className="mb-8 animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {language === 'ar' ? 'سجل الرحلات' : 'Delivery Logbook'}
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                  {language === 'ar'
                    ? `إجمالي ${deliveries.length} رحلة مسجلة`
                    : `Total ${deliveries.length} recorded deliveries`
                  }
                </p>
              </div>
              <div className="relative self-start sm:self-auto">
                <div className={`w-14 h-14 md:w-16 md:h-16 ${customColors.gradientSuccess} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
                  <BarChart3 className="w-7 h-7" />
                </div>
              </div>
            </div>

            {/* Stats Overview - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6"> {/* Added lg:grid-cols-4 for desktop expansion */}
              <div className={`${customColors.card} p-5 md:p-6`}>
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${customColors.gradientOcean} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === 'ar' ? 'إجمالي الأرباح' : 'Total Earnings'}</p>
                    <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">AED {totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className={`${customColors.card} p-5 md:p-6`}>
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${customColors.gradientSand} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Clock className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === 'ar' ? 'متوسط الوقت' : 'Avg. Time'}</p>
                    <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{averageDeliveryTime}</p>
                  </div>
                </div>
              </div>

              {/* Adding placeholder stats for desktop layout completeness */}
              <div className={`${customColors.card} p-5 md:p-6 hidden lg:block`}>
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${customColors.gradientSuccess} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === 'ar' ? 'تقييم النجوم' : 'Star Rating'}</p>
                    <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">4.8</p>
                  </div>
                </div>
              </div>

              <div className={`${customColors.card} p-5 md:p-6 hidden lg:block`}>
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === 'ar' ? 'رحلات مكتملة' : 'Completed Trips'}</p>
                    <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{deliveries.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters - Responsive Layout */}
          <div className={`p-5 md:p-6 mb-6 ${customColors.card}`}>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'بحث في الطلبات بالاسم أو المنطقة...' : 'Search deliveries by name or area...'}
                  className={`${customColors.input} pl-10`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className={`${customColors.buttonPrimary} flex items-center justify-center w-full sm:w-auto flex-shrink-0`}
              >
                <Plus className="w-5 h-5 mr-2" />
                {language === 'ar' ? 'إضافة رحلة' : 'Add Delivery'}
              </button>
            </div>

            <div className="flex items-center space-x-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"> {/* Adjusted margins for better mobile scroll */}
              <button
                onClick={() => setPlatformFilter('all')}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${platformFilter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {language === 'ar' ? 'الكل' : 'All'}
              </button>
              {(['talabat', 'jahez', 'careem', 'noon'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setPlatformFilter(platform)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm font-medium ${platformFilter === platform ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {language === 'ar' 
                    ? platform === 'talabat' ? 'طلبات' 
                    : platform === 'jahez' ? 'جاهز'
                    : platform === 'careem' ? 'كريم'
                    : 'نون'
                    : platform === 'talabat' ? 'Talabat'
                    : platform === 'jahez' ? 'Jahez'
                    : platform === 'careem' ? 'Careem'
                    : 'Noon'
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Add Delivery Form - Responsive Grid */}
          {showAddForm && (
            <div className={`p-5 md:p-6 mb-6 animate-slide-up ${customColors.card}`}>
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                {language === 'ar' ? 'إضافة رحلة جديدة' : 'Add New Delivery'}
              </h3>

              <form onSubmit={handleAddDelivery} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'اسم العميل' : 'Customer Name'}
                    </label>
                    <input
                      type="text"
                      required
                      className={customColors.input}
                      value={newDelivery.customer}
                      onChange={(e) => setNewDelivery({...newDelivery, customer: e.target.value})}
                      placeholder={language === 'ar' ? 'اسم العميل' : 'Customer Name'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'المنصة' : 'Platform'}
                    </label>
                    <select
                      className={customColors.input}
                      value={newDelivery.platform}
                      onChange={(e) => setNewDelivery({...newDelivery, platform: e.target.value as any})}
                    >
                      <option value="talabat">Talabat</option>
                      <option value="jahez">Jahez</option>
                      <option value="careem">Careem</option>
                      <option value="noon">Noon</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'الأجرة (AED)' : 'Fee (AED)'}
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      className={customColors.input}
                      value={newDelivery.fee || ''}
                      onChange={(e) => setNewDelivery({...newDelivery, fee: parseFloat(e.target.value) || 0})}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'المنطقة' : 'Area'}
                    </label>
                    <input
                      type="text"
                      required
                      className={customColors.input}
                      value={newDelivery.area}
                      onChange={(e) => setNewDelivery({...newDelivery, area: e.target.value})}
                      placeholder={language === 'ar' ? 'اسم المنطقة' : 'Area Name'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'ملاحظات (اختياري)' : 'Notes (Optional)'}
                  </label>
                  <textarea
                    className={`${customColors.input} min-h-[100px]`}
                    value={newDelivery.notes}
                    onChange={(e) => setNewDelivery({...newDelivery, notes: e.target.value})}
                    placeholder={language === 'ar' ? 'أي ملاحظات إضافية...' : 'Any extra notes...'}
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className={customColors.buttonSecondary}
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className={customColors.buttonPrimary}
                  >
                    {language === 'ar' ? 'إضافة الرحلة' : 'Add Delivery'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Deliveries List */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'ar' ? 'جميع الرحلات' : 'All Deliveries'}
              </h2>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-bold text-lg text-gray-900">{filteredDeliveries.length}</span>
                <span className="mx-2">•</span>
                <span>{language === 'ar' ? 'رحلة' : 'deliveries'}</span>
              </div>
            </div>

            {filteredDeliveries.length > 0 ? (
              <div className="space-y-4">
                {filteredDeliveries.map((delivery, index) => (
                  <div key={delivery.id} className="transform transition-all duration-300 hover:scale-[1.005]">
                    <DeliveryCard
                      delivery={delivery}
                      index={index}
                      onDelete={() => deleteDelivery(delivery.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${customColors.card} p-8 text-center`}>
                <div className={`w-20 h-20 mx-auto mb-4 ${customColors.gradientSand} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Package className="w-10 h-10 text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {language === 'ar' ? 'لا توجد رحلات' : 'No deliveries found'}
                </h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                  {language === 'ar' 
                    ? searchQuery || platformFilter !== 'all'
                      ? 'لم يتم العثور على رحلات تطابق بحثك أو الفلتر المحدد.'
                      : 'ابدأ بإضافة أول رحلة لتتبع أرباحك وأدائك!'
                    : searchQuery || platformFilter !== 'all'
                      ? 'No deliveries match your current search or filter.'
                      : 'Start by adding your first delivery to track earnings and performance!'
                  }
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className={customColors.buttonPrimary}
                >
                  {language === 'ar' ? 'إضافة أول رحلة' : 'Add First Delivery'}
                </button>
              </div>
            )}
          </div>

          {/* Export Section */}
          <div className="mt-8">
            <div className={`${customColors.card} p-5 md:p-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {language === 'ar' ? 'تصدير البيانات' : 'Export Data'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' 
                      ? 'حفظ نسخة احتياطية من سجل الرحلات في ملف CSV/Excel.'
                      : 'Backup your delivery history to a CSV/Excel file.'
                    }
                  </p>
                </div>
                <button className={`${customColors.buttonSecondary} flex items-center justify-center sm:w-auto w-full`}>
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تصدير الآن' : 'Export Now'}
                </button>
              </div>
            </div>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-50 max-w-7xl mx-auto">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}
