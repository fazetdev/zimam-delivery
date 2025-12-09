import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useLogbookSummary } from '@/context/useLogbook'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import DeliveryCard from '@/components/DeliveryCard'
import { Package, Clock, Star, ChevronRight, MapPin, Users, CheckCircle, TrendingUp } from 'lucide-react'

// Helper component for the Stat Card to clean up the main return
const DashboardStatCard = ({ stat, language }) => {
  const Icon = stat.icon
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Premium Header/Color Indicator */}
      <div className={`h-2 ${stat.bgColor} w-full`}></div> 
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-3 rounded-full ${stat.color} bg-opacity-70`}>
            <Icon size={24} />
          </div>
          <p className="text-sm font-semibold text-gray-500">{stat.title}</p>
        </div>
        <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <TrendingUp size={16} className="text-green-500" />
          <span className="ml-1">
             {language === 'ar' ? 'أداء ممتاز' : 'Great performance'}
          </span>
        </div>
      </div>
    </div>
  )
}

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
      bgColor: 'bg-blue-600' // Changed to darker for better contrast
    },
    {
      title: language === 'ar' ? 'أرباح اليوم' : "Today's Earnings",
      value: `AED ${todayEarnings.toLocaleString()}`,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-600'
    },
    {
      title: language === 'ar' ? 'متوسط التقييم' : 'Avg. Rating',
      value: '4.8',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      bgColor: 'bg-yellow-600'
    },
    {
      title: language === 'ar' ? 'متوسط الوقت' : 'Avg. Time',
      value: '32m',
      icon: Clock,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-600'
    }
  ]

  return (
    // REMOVED THE md:max-w-md constraint
    <div className="min-h-screen bg-gray-50"> 
      <div className="max-w-7xl mx-auto"> {/* Centered content on large screens */}
        <Header />

        <main className="pb-20 px-4 pt-4">
          
          {/* Welcome Banner - Enhanced with Gradient */}
          <div className="bg-gradient-to-r from-indigo-700 to-blue-700 rounded-xl p-6 text-white shadow-xl mb-6">
            <h1 className="text-3xl font-bold">
              {language === 'ar' ? 'مرحباً، علي!' : 'Welcome back, Ali!'}
            </h1>
            <p className="text-blue-100 mt-1 text-lg">
              {language === 'ar'
                ? `لديك ${todayDeliveries.length} طلبات جاهزة للتوصيل اليوم. هيا بنا!`
                : `You have ${todayDeliveries.length} deliveries ready today. Let's go!`
              }
            </p>
          </div>
          
          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* COLUMN 1 & 2: Main Content (Stats and Deliveries) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Today's Stats - Enhanced Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {todaysStats.map((stat) => (
                  <DashboardStatCard key={stat.title} stat={stat} language={language} />
                ))}
              </div>

              {/* Today's Deliveries - Main Focus */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {language === 'ar' ? 'طلبات اليوم' : "Today's Deliveries"}
                  </h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors">
                    {language === 'ar' ? 'عرض الكل' : 'View All'}
                    <ChevronRight size={16} className={language === 'ar' ? 'mr-1' : 'ml-1'} />
                  </button>
                </div>

                {todayDeliveries.length > 0 ? (
                  <div className="space-y-3">
                    {/* Delivery Cards are now wider on desktop */}
                    {todayDeliveries.slice(0, 5).map((delivery, index) => (
                      <DeliveryCard
                        key={delivery.id}
                        delivery={delivery}
                        index={index}
                      />
                    ))}

                    {todayDeliveries.length > 5 && (
                      <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors font-medium">
                        {language === 'ar' 
                          ? `عرض ${todayDeliveries.length - 5} طلبات أخرى`
                          : `View ${todayDeliveries.length - 5} more deliveries`
                        }
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm">
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
            </div> {/* End of Main Content Column */}


            {/* COLUMN 3: Sidebar (Quick Actions & Tips) */}
            <div className="lg:col-span-1 space-y-6">

              {/* Quick Actions */}
              <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 transition-colors">
                    <MapPin className="w-7 h-7 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-800">
                      {language === 'ar' ? 'خريطة الطلبات' : 'Delivery Map'}
                    </span>
                  </button>

                  <button className="flex flex-col items-center bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 transition-colors">
                    <Users className="w-7 h-7 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-800">
                      {language === 'ar' ? 'فريق العمل' : 'Team Hub'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Simple Tips Section */}
              <div className="bg-yellow-50 rounded-xl border border-yellow-300 p-5 shadow-lg">
                <div className="flex items-start">
                  <Star className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className={language === 'ar' ? 'mr-3' : 'ml-3'}>
                    <p className="font-bold text-gray-900 mb-1 text-lg">
                      {language === 'ar' ? 'نصيحة اليوم' : "Today's Tip"}
                    </p>
                    <p className="text-gray-700">
                      {language === 'ar'
                        ? 'تأكد من التحقق من العنوان قبل بدء التوصيل لتوفير الوقت'
                        : 'Always verify the address before starting delivery to save time and fuel efficiency.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div> {/* End of Sidebar Column */}

          </div> {/* End of Main Dashboard Grid */}
        </main>

        {/* Bottom Nav is fine as a mobile element */}
        <BottomNav />
      </div>
    </div>
  )
}
