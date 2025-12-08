import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useWalletSummary } from '@/context/useWallet'
import { useLogbookSummary } from '@/context/useLogbook'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import DeliveryCard from '@/components/DeliveryCard'
import StatsCard from '@/components/StatsCard'
import { Package, Clock, Star, TrendingUp, TrendingDown } from 'lucide-react'

type StatsColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow'

interface StatItem {
  title: string
  value: string
  icon: typeof TrendingUp
  color: StatsColor
  change?: string
}

export default function HomePage() {
  const { language } = useLanguage()
  const { todayIncome, todayExpense, todayProfit, weeklySummary } = useWalletSummary()
  const { todayDeliveries, todayEarnings, platformStats } = useLogbookSummary()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Zimam Delivery...</p>
        </div>
      </div>
    )
  }

  const weeklyChange = weeklySummary.length >= 2
    ? ((weeklySummary[6]?.profit - weeklySummary[5]?.profit) / weeklySummary[5]?.profit) * 100 || 0
    : 0

  const stats: StatItem[] = [
    {
      title: language === 'ar' ? 'أرباح اليوم' : "Today's Earnings",
      value: `AED ${todayProfit}`,
      icon: todayProfit >= 0 ? TrendingUp : TrendingDown,
      color: todayProfit >= 0 ? 'green' : 'red',
      change: weeklyChange >= 0 ? `+${weeklyChange.toFixed(1)}%` : `${weeklyChange.toFixed(1)}%`
    },
    {
      title: language === 'ar' ? 'طلبات اليوم' : "Today's Deliveries",
      value: todayDeliveries.length.toString(),
      icon: Package,
      color: 'blue'
    },
    {
      title: language === 'ar' ? 'الدخل اليوم' : "Today's Income",
      value: `AED ${todayIncome}`,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: language === 'ar' ? 'المصاريف اليوم' : "Today's Expenses",
      value: `AED ${todayExpense}`,
      icon: TrendingDown,
      color: 'orange'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg relative">
        <Header />

        <main className="pb-20 px-4 pt-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {language === 'ar' ? 'مرحباً، علي!' : 'Welcome back, Ali!'}
            </h2>
            <p className="text-gray-600 mt-1">
              {language === 'ar'
                ? `لديك ${todayDeliveries.length} طلبات اليوم`
                : `You have ${todayDeliveries.length} deliveries today`
              }
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <StatsCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={Icon}
                  color={stat.color}
                  change={stat.change}
                />
              )
            })}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'ar' ? 'الطلبات الأخيرة' : 'Recent Deliveries'}
              </h3>
              <button className="text-sm text-blue-600 font-medium">
                {language === 'ar' ? 'عرض الكل' : 'View All'}
              </button>
            </div>

            {todayDeliveries.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center shadow border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={24} className="text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  {language === 'ar' ? 'لا توجد طلبات اليوم' : 'No deliveries today'}
                </h4>
                <p className="text-gray-600">
                  {language === 'ar'
                    ? 'ابدأ بإضافة طلبك الأول في سجل الطلبات'
                    : 'Start by adding your first delivery in the logbook'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {todayDeliveries.slice(0, 3).map((delivery) => (
                  <DeliveryCard
                    key={delivery.id}
                    customer={delivery.customer}
                    platform={delivery.platform}
                    fee={delivery.fee}
                    area={delivery.area}
                    notes={delivery.notes}
                    time={delivery.time}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg">
              {language === 'ar' ? 'بدء توصيل جديد' : 'Start New Delivery'}
            </button>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}
