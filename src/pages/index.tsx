import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useLogbookSummary } from '@/context/useLogbook'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import DeliveryCard from '@/components/DeliveryCard'
import { Package, Clock, Star, ChevronRight, MapPin, Users, CheckCircle, TrendingUp, Zap, Target, Trophy, Award, Compass, Sparkles } from 'lucide-react'

// Added types to fix Vercel TypeScript error
type StatCardData = {
  title: string
  value: string
  icon: React.ComponentType<any>
  color: string
  gradient: string
}

type DashboardStatCardProps = {
  stat: StatCardData
  language: string
}

// Enhanced Dashboard Stat Card
const DashboardStatCard = ({ stat, language }: DashboardStatCardProps) => {
  const Icon = stat.icon
  return (
    <div className="group relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]">
      {/* Premium Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

      {/* Animated Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500 group-hover:duration-200`}></div>

      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl ${stat.color} bg-gradient-to-br ${stat.gradient} shadow-lg transform transition-transform group-hover:scale-110`}>
            <Icon size={24} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {stat.title}
          </span>
        </div>
        <p className="text-4xl font-black text-gray-900 tracking-tight mb-2">{stat.value}</p>
        <div className="flex items-center">
          <div className="flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-xs font-bold">
            <Target size={12} className="mr-1" />
            <span>{language === 'ar' ? '+12% هذا الشهر' : '+12% this month'}</span>
          </div>
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-500 border-l-transparent rounded-full animate-spin mx-auto animation-delay-1000"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-700 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            {language === 'ar' ? 'تحميل زمام دليفري...' : 'Loading Zimam Delivery...'}
          </p>
        </div>
      </div>
    )
  }

  const todaysStats = [
    {
      title: language === 'ar' ? 'طلبات اليوم' : "Today's Deliveries",
      value: todayDeliveries.length.toString(),
      icon: Package,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-400',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      title: language === 'ar' ? 'أرباح اليوم' : "Today's Earnings",
      value: `AED ${todayEarnings.toLocaleString()}`,
      icon: CheckCircle,
      color: 'bg-gradient-to-br from-emerald-500 to-green-400',
      gradient: 'from-emerald-500 to-green-400'
    },
    {
      title: language === 'ar' ? 'تقييم النجوم' : 'Star Rating',
      value: '4.8',
      icon: Star,
      color: 'bg-gradient-to-br from-amber-500 to-yellow-400',
      gradient: 'from-amber-500 to-yellow-400'
    },
    {
      title: language === 'ar' ? 'سرعة التوصيل' : 'Delivery Speed',
      value: '32m',
      icon: Zap,
      color: 'bg-gradient-to-br from-purple-500 to-pink-400',
      gradient: 'from-purple-500 to-pink-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Header />

        <main className="pb-24 px-4 pt-6 md:pt-8">
          {/* Welcome Banner - Gulf Inspired Luxury Design */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-700 to-emerald-800 p-8 text-white shadow-2xl mb-8 transform transition-all duration-500 hover:shadow-3xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full translate-y-32 -translate-x-32"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <Trophy className="w-10 h-10 text-yellow-400 mr-3" />
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                  {language === 'ar' ? 'مرحباً، البطل!' : 'Welcome back, Champion!'}
                </h1>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xl text-blue-100 mb-2">
                    {language === 'ar'
                      ? '🏆 أنت ضمن أفضل ١٠٪ من مندوبي التوصيل هذا الشهر!'
                      : '🏆 You\'re in the top 10% of delivery agents this month!'
                    }
                  </p>
                  <p className="text-lg text-emerald-200 font-medium">
                    {language === 'ar'
                      ? `لديك ${todayDeliveries.length} مهمة ⚡ تنتظر الإنجاز`
                      : `${todayDeliveries.length} high-priority missions ⚡ await your expertise`
                    }
                  </p>
                </div>

                <button className="mt-4 md:mt-0 px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center">
                  <Sparkles className="mr-2" size={20} />
                  {language === 'ar' ? 'ابدأ الجولة 🚀' : 'Start Mission 🚀'}
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* COLUMN 1 & 2: Main Content */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Today's Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {todaysStats.map((stat) => (
                  <DashboardStatCard key={stat.title} stat={stat} language={language} />
                ))}
              </div>

              {/* Today's Deliveries */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      <Compass className="mr-3 text-blue-600" size={28} />
                      {language === 'ar' ? 'مهام اليوم' : "Today's Missions"}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {language === 'ar'
                        ? 'طلباتك ذات الأولوية القصوى'
                        : 'Your high-priority delivery missions'
                      }
                    </p>
                  </div>
                  <button className="mt-4 sm:mt-0 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 flex items-center">
                    {language === 'ar' ? 'عرض الخريطة 🗺️' : 'View Map 🗺️'}
                    <ChevronRight size={16} className={language === 'ar' ? 'mr-2' : 'ml-2'} />
                  </button>
                </div>

                {todayDeliveries.length > 0 ? (
                  <div className="space-y-4">
                    {todayDeliveries.slice(0, 5).map((delivery, index) => (
                      <div key={delivery.id} className="transform transition-all duration-300 hover:scale-[1.01]">
                        <DeliveryCard
                          delivery={delivery}
                          index={index}
                        />
                      </div>
                    ))}

                    {todayDeliveries.length > 5 && (
                      <button className="w-full py-4 bg-gradient-to-r from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl text-gray-700 hover:text-gray-900 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-medium group">
                        <div className="flex items-center justify-center">
                          <span>
                            {language === 'ar' 
                              ? `🔄 عرض ${todayDeliveries.length - 5} مهمة أخرى`
                              : `🔄 View ${todayDeliveries.length - 5} more missions`
                            }
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300 p-10 text-center shadow-inner">
                    <div className="inline-flex p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl mb-4">
                      <Package className="w-16 h-16 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {language === 'ar' ? '🎯 جاهز للانطلاق!' : '🎯 Ready for Action!'}
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      {language === 'ar' 
                        ? 'لا توجد مهام حالياً. سيكون هناك مهام جديدة قريباً. استعد للانطلاق!'
                        : 'No active missions right now. New high-value deliveries will appear soon. Stay prepared!'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* COLUMN 3: Sidebar */}
            <div className="lg:col-span-1 space-y-6 lg:space-y-8">
              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-amber-500 mr-3" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {language === 'ar' ? 'الأوامر السريعة' : 'Command Center'}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-xl p-5 hover:border-blue-300 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 transform hover:scale-105">
                    <div className="flex flex-col items-center">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">
                        {language === 'ar' ? 'خرائط ذكية' : 'Smart Maps'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {language === 'ar' ? 'مسار مثالي' : 'Optimal Route'}
                      </span>
                    </div>
                  </button>

                  <button className="group relative bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-100 rounded-xl p-5 hover:border-emerald-300 hover:from-emerald-100 hover:to-green-100 transition-all duration-300 transform hover:scale-105">
                    <div className="flex flex-col items-center">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-400 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">
                        {language === 'ar' ? 'فريق النخبة' : 'Elite Team'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {language === 'ar' ? 'التواصل المباشر' : 'Direct Connect'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Performance tips */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 p-6 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-400 rounded-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className={language === 'ar' ? 'mr-3' : 'ml-3'}>
                      <p className="font-bold text-gray-900 text-lg">
                        {language === 'ar' ? '💎 نصيحة النخبة' : '💎 Elite Tip'}
                      </p>
                      <p className="text-sm text-amber-700 font-medium">
                        {language === 'ar' ? 'للمحترفين فقط' : 'For Professionals'}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 leading-relaxed">
                    {language === 'ar'
                      ? 'استخدم ميزة "المسار الذكي" في ساعة الذروة لتوفير ١٥ دقيقة في كل رحلة وتزيد أرباحك ٢٠٪.'
                      : 'Use Smart Routing during peak hours to save 15 minutes per trip and increase earnings by 20%. Premium customers appreciate punctuality!'
                    }
                  </p>
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-sm font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105">
                    {language === 'ar' ? 'تفعيل المسار الذكي →' : 'Activate Smart Route →'}
                  </button>
                </div>
              </div>

              {/* Daily challenge */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {language === 'ar' ? '🏅 التحدي اليومي' : '🏅 Daily Challenge'}
                  </h3>
                  <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold rounded-full">
                    {language === 'ar' ? '٨٥٪' : '85%'}
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  {language === 'ar'
                    ? 'أكمل ٥٠ توصيل هذا الأسبوع واربح مكافأة إضافية بقيمة ٥٠٠ درهم!'
                    : 'Complete 50 deliveries this week to earn an extra AED 500 bonus!'
                  }
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  {language === 'ar' ? '٤٢/٥٠ مكتمل' : '42/50 completed'}
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}
