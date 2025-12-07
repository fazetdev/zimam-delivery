import { useState } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useLogbook, useLogbookSummary } from '@/context/useLogbook'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import DeliveryCard from '@/components/DeliveryCard'
import { Plus, Filter, Search, BarChart3 } from 'lucide-react'
import { Platform } from '@/context/useLogbook'

export default function LogbookPage() {
  const { language } = useLanguage()
  const { addDelivery, deleteDelivery, searchDeliveries } = useLogbook()
  const { todayDeliveries, todayEarnings, totalDeliveries } = useLogbookSummary()
  
  const [newDelivery, setNewDelivery] = useState({
    customer: '',
    platform: 'talabat' as Platform,
    fee: '',
    area: '',
    notes: '',
  })

  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPlatform, setFilterPlatform] = useState<Platform | 'all'>('all')
  const [isClient, setIsClient] = useState(false)

  useState(() => {
    setIsClient(true)
  })

  if (!isClient) return null

  const handleAddDelivery = () => {
    if (!newDelivery.customer || !newDelivery.fee || !newDelivery.area) {
      alert(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields')
      return
    }
    
    addDelivery({
      customer: newDelivery.customer,
      platform: newDelivery.platform,
      fee: parseInt(newDelivery.fee),
      area: newDelivery.area,
      notes: newDelivery.notes,
    })
    
    setNewDelivery({ customer: '', platform: 'talabat', fee: '', area: '', notes: '' })
    setShowForm(false)
  }

  // Get filtered deliveries
  const filteredDeliveries = searchDeliveries(searchQuery, filterPlatform === 'all' ? undefined : filterPlatform)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg relative">
        <Header />
        
        <main className="pb-20 px-4 pt-4">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'ar' ? 'سجل الطلبات' : 'Delivery Logbook'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar' ? 'سجل جميع طلبات التوصيل' : 'Record all your delivery orders'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow border">
              <p className="text-sm text-gray-500">{language === 'ar' ? 'طلبات اليوم' : "Today's Deliveries"}</p>
              <p className="text-2xl font-bold text-gray-800">{todayDeliveries.length}</p>
              <div className="flex items-center mt-1">
                <BarChart3 size={14} className="text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">
                  {language === 'ar' ? 'إجمالي' : 'Total'}: {totalDeliveries}
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow border">
              <p className="text-sm text-gray-500">{language === 'ar' ? 'أرباح اليوم' : "Today's Earnings"}</p>
              <p className="text-2xl font-bold text-gray-800">AED {todayEarnings}</p>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'ar' ? 'متوسط' : 'Avg'}: AED {todayDeliveries.length > 0 ? Math.round(todayEarnings / todayDeliveries.length) : 0}
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-3 mb-6">
            <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3 flex items-center">
              <Search size={20} className="text-gray-400" />
              <input 
                type="text" 
                placeholder={language === 'ar' ? 'ابحث عن طلب...' : 'Search delivery...'} 
                className="bg-transparent outline-none px-3 flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <select 
                className="bg-white p-3 rounded-xl shadow border border-gray-200 appearance-none pl-4 pr-8"
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value as Platform | 'all')}
              >
                <option value="all">{language === 'ar' ? 'كل المنصات' : 'All Platforms'}</option>
                <option value="talabat">Talabat</option>
                <option value="jahez">Jahez</option>
                <option value="careem">Careem</option>
                <option value="noon">Noon</option>
                <option value="other">{language === 'ar' ? 'أخرى' : 'Other'}</option>
              </select>
              <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Add Delivery Form */}
          {showForm && (
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">
                {language === 'ar' ? 'إضافة طلب جديد' : 'Add New Delivery'}
              </h3>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder={language === 'ar' ? 'اسم العميل *' : 'Customer name *'} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newDelivery.customer}
                  onChange={(e) => setNewDelivery({...newDelivery, customer: e.target.value})}
                  required
                />
                
                <select 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newDelivery.platform}
                  onChange={(e) => setNewDelivery({...newDelivery, platform: e.target.value as Platform})}
                >
                  <option value="talabat">Talabat</option>
                  <option value="jahez">Jahez</option>
                  <option value="careem">Careem</option>
                  <option value="noon">Noon</option>
                  <option value="other">{language === 'ar' ? 'أخرى' : 'Other'}</option>
                </select>
                
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder={language === 'ar' ? 'رسوم التوصيل *' : 'Delivery fee *'} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                    value={newDelivery.fee}
                    onChange={(e) => setNewDelivery({...newDelivery, fee: e.target.value})}
                    min="1"
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">AED</span>
                </div>
                
                <input 
                  type="text" 
                  placeholder={language === 'ar' ? 'المنطقة / العنوان *' : 'Area / Address *'} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newDelivery.area}
                  onChange={(e) => setNewDelivery({...newDelivery, area: e.target.value})}
                  required
                />
                
                <textarea 
                  placeholder={language === 'ar' ? 'ملاحظات (اختياري)' : 'Notes (optional)'} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  value={newDelivery.notes}
                  onChange={(e) => setNewDelivery({...newDelivery, notes: e.target.value})}
                />
                
                <div className="flex space-x-3">
                  <button 
                    onClick={handleAddDelivery}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 shadow-md transition"
                  >
                    {language === 'ar' ? 'حفظ الطلب' : 'Save Delivery'}
                  </button>
                  <button 
                    onClick={() => {
                      setShowForm(false)
                      setNewDelivery({ customer: '', platform: 'talabat', fee: '', area: '', notes: '' })
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delivery List Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {language === 'ar' ? 'طلبات التوصيل' : 'Delivery Orders'}
            </h3>
            <span className="text-sm text-gray-500">
              {filteredDeliveries.length} {language === 'ar' ? 'من' : 'of'} {totalDeliveries}
            </span>
          </div>

          {/* Delivery List */}
          {filteredDeliveries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow border">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">
                {language === 'ar' ? 'لا توجد طلبات' : 'No deliveries found'}
              </h4>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? searchQuery 
                    ? 'حاول البحث بكلمة مختلفة أو أضف طلباً جديداً' 
                    : 'أضف طلبك الأول لتبدأ'
                  : searchQuery 
                    ? 'Try a different search or add a new delivery' 
                    : 'Add your first delivery to get started'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDeliveries.map((delivery) => (
                <DeliveryCard
                  key={delivery.id}
                  customer={delivery.customer}
                  platform={delivery.platform}
                  fee={delivery.fee}
                  area={delivery.area}
                  notes={delivery.notes}
                  time={delivery.time}
                  onDelete={() => {
                    if (confirm(language === 'ar' ? 'هل تريد حذف هذا الطلب؟' : 'Delete this delivery?')) {
                      deleteDelivery(delivery.id)
                    }
                  }}
                />
              ))}
            </div>
          )}

          {/* Add Button */}
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              className="fixed bottom-24 right-6 bg-blue-600 text-white p-5 rounded-full shadow-lg hover:bg-blue-700 transition hover:scale-110 z-40"
              aria-label={language === 'ar' ? 'إضافة طلب جديد' : 'Add new delivery'}
            >
              <Plus size={24} />
            </button>
          )}
        </main>
        
        <BottomNav />
      </div>
    </div>
  )
}
