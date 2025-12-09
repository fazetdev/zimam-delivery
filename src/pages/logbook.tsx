'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useLogbook } from '@/context/useLogbook'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import DeliveryCard, { Delivery } from '@/components/DeliveryCard'
import { Search, Filter, Calendar, Download, Plus, ChevronDown, BarChart3, TrendingUp, Clock, Star, Package } from 'lucide-react'

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

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
            {language === 'ar' ? 'جاري تحميل سجل الرحلات...' : 'Loading Logbook...'}
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
  const averageDeliveryTime = filteredDeliveries.length > 0 ? '32min' : '0min'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-60 h-60 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 -right-20 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-md mx-auto min-h-screen relative z-10">
        <Header />

        <main className="pb-24 px-5 pt-5">
          {/* Page Header */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {language === 'ar' ? 'سجل الرحلات' : 'Delivery Logbook'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {language === 'ar'
                    ? `إجمالي ${deliveries.length} رحلة مسجلة`
                    : `Total ${deliveries.length} recorded deliveries`
                  }
                </p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-success rounded-2xl flex items-center justify-center text-white shadow-medium">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="card p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-ocean rounded-xl flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === 'ar' ? 'إجمالي الأرباح' : 'Total Earnings'}</p>
                    <p className="text-2xl font-bold text-gray-900">AED {totalEarnings.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-sand rounded-xl flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{language === 'ar' ? 'متوسط الوقت' : 'Avg. Time'}</p>
                    <p className="text-2xl font-bold text-gray-900">{averageDeliveryTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="card p-4 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'بحث في الطلبات...' : 'Search deliveries...'}
                  className="input-modern pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'إضافة' : 'Add'}
              </button>
            </div>

            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              <button
                onClick={() => setPlatformFilter('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${platformFilter === 'all' ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-gray-100 text-gray-700'}`}
              >
                {language === 'ar' ? 'الكل' : 'All'}
              </button>
              {(['talabat', 'jahez', 'careem', 'noon'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setPlatformFilter(platform)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${platformFilter === platform ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-gray-100 text-gray-700'}`}
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

          {/* Add Delivery Form */}
          {showAddForm && (
            <div className="card p-5 mb-6 animate-slide-up">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {language === 'ar' ? 'إضافة رحلة جديدة' : 'Add New Delivery'}
              </h3>
              
              <form onSubmit={handleAddDelivery} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'اسم العميل' : 'Customer Name'}
                    </label>
                    <input
                      type="text"
                      required
                      className="input-modern"
                      value={newDelivery.customer}
                      onChange={(e) => setNewDelivery({...newDelivery, customer: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'المنصة' : 'Platform'}
                    </label>
                    <select
                      className="input-modern"
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'الأجرة (AED)' : 'Fee (AED)'}
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      className="input-modern"
                      value={newDelivery.fee || ''}
                      onChange={(e) => setNewDelivery({...newDelivery, fee: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'المنطقة' : 'Area'}
                    </label>
                    <input
                      type="text"
                      required
                      className="input-modern"
                      value={newDelivery.area}
                      onChange={(e) => setNewDelivery({...newDelivery, area: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'ملاحظات (اختياري)' : 'Notes (Optional)'}
                  </label>
                  <textarea
                    className="input-modern min-h-[100px]"
                    value={newDelivery.notes}
                    onChange={(e) => setNewDelivery({...newDelivery, notes: e.target.value})}
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
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
                <span className="font-medium text-gray-900">{filteredDeliveries.length}</span>
                <span className="mx-2">•</span>
                <span>{language === 'ar' ? 'رحلة' : 'deliveries'}</span>
              </div>
            </div>

            {filteredDeliveries.length > 0 ? (
              <div className="space-y-4">
                {filteredDeliveries.map((delivery, index) => (
                  <DeliveryCard
                    key={delivery.id}
                    delivery={delivery}
                    index={index}
                    onDelete={() => deleteDelivery(delivery.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-sand rounded-2xl flex items-center justify-center">
                  <Package className="w-10 h-10 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {language === 'ar' ? 'لا توجد رحلات' : 'No deliveries found'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'ar' 
                    ? searchQuery 
                      ? 'لم يتم العثور على رحلات تطابق بحثك'
                      : 'ابدأ بإضافة أول رحلة لتتبع أرباحك'
                    : searchQuery
                      ? 'No deliveries match your search'
                      : 'Start by adding your first delivery to track earnings'
                  }
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary"
                >
                  {language === 'ar' ? 'إضافة أول رحلة' : 'Add First Delivery'}
                </button>
              </div>
            )}
          </div>

          {/* Export Section */}
          <div className="mt-8">
            <div className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {language === 'ar' ? 'تصدير البيانات' : 'Export Data'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' 
                      ? 'حفظ نسخة احتياطية من سجل الرحلات'
                      : 'Backup your delivery history'
                    }
                  </p>
                </div>
                <button className="btn-secondary flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تصدير' : 'Export'}
                </button>
              </div>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}
