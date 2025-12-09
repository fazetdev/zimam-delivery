import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useLogbookSummary } from '@/context/useLogbook'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import DeliveryCard from '@/components/DeliveryCard'
import { Package, Clock, Star, ChevronRight, MapPin, Users, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const { language } = useLanguage()
  const { todayDeliveries, todayEarnings } = useLogbookSummary()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Zimam Delivery...</p>
        </div>
      </div>
    )
  }

  const todaysStats = [
    {
      title: language === 'ar' ? 'طلبات اليوم' : "Today's Deliveries",
      value: todayDeliveries.length.toString(),
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-500'
    },
    {
      title: language === 'ar' ? 'أرباح اليوم' : "Today's Earnings",
      value: `AED ${todayEarnings.toLocaleString()}`,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-500'
    },
    {
      title: language === 'ar' ? 'متوسط التقييم' : 'Avg. Rating',
      value: '4.8',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      bgColor: 'bg-yellow-500'
    },
    {
      title: language === 'ar' ? 'متوسط الوقت' : 'Avg. Time',
      value: '32m',
      icon: Clock,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile container - full width on mobile, centered on tablet/desktop */}
      <div className="w-full min-h-screen bg-white md:max-w-md md:mx-auto">
        <Header />

        <main className="pb-20 px-4 pt-4">
          {/* Welcome Section - Simple */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'ar' ? 'مرحباً، علي!' : 'Welcome back, Ali!'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar'
                ? `لديك ${todayDeliveries.length} طلبات اليوم`
                : `You have ${todayDeliveries.length} deliveries today`
              }
            </p>
          </div>

          {/* Today's Stats - Simple Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {todaysStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-medium text-gray-500">{stat.title}</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-center transition-colors">
                <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-800">
                  {language === 'ar' ? 'خريطة الطلبات' : 'Delivery Map'}
                </span>
              </button>
              
              <button className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition-colors">
                <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-800">
                  {language === 'ar' ? 'عملاء جدد' : 'New Customers'}
                </span>
              </button>
            </div>
          </div>

          {/* Today's Deliveries - Main Focus */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {language === 'ar' ? 'طلبات اليوم' : "Today's Deliveries"}
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                {language === 'ar' ? 'عرض الكل' : 'View All'}
                <ChevronRight size={16} className="mr-1" />
              </button>
            </div>
            
            {todayDeliveries.length > 0 ? (
              <div className="space-y-3">
                {todayDeliveries.slice(0, 3).map((delivery, index) => (
                  <DeliveryCard
                    key={delivery.id}
                    delivery={delivery}
                    index={index}
                  />
                ))}
                
                {todayDeliveries.length > 3 && (
                  <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors text-sm">
                    {language === 'ar' 
                      ? `عرض ${todayDeliveries.length - 3} طلبات أخرى`
                      : `View ${todayDeliveries.length - 3} more deliveries`
                    }
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-medium text-gray-800 mb-1">
                  {language === 'ar' ? 'لا توجد طلبات اليوم' : 'No deliveries today'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' 
                    ? 'ابدأ بقبول طلبات جديدة'
                    : 'Start accepting new delivery requests'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Simple Tips Section */}
          <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-4">
            <div className="flex items-start">
              <Star className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800 mb-1">
                  {language === 'ar' ? 'نصيحة اليوم' : "Today's Tip"}
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'ar'
                    ? 'تأكد من التحقق من العنوان قبل بدء التوصيل لتوفير الوقت'
                    : 'Always verify the address before starting delivery to save time'
                  }
                </p>
              </div>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}
