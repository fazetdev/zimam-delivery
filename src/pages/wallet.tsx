import { useState } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useWallet, useWalletSummary } from '@/context/useWallet'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import TransactionCard from '@/components/TransactionCard'
import StatsCard from '@/components/StatsCard'
import { Plus, Minus } from 'lucide-react'

export default function WalletPage() {
  const { language } = useLanguage()
  const { addTransaction, deleteTransaction } = useWallet()
  const { todayIncome, todayExpense, todayProfit, todayTransactions } = useWalletSummary()
  const [isClient, setIsClient] = useState(false)

  useState(() => {
    setIsClient(true)
  })

  if (!isClient) return null

  const handleAddTransaction = (type: 'income' | 'expense') => {
    const categories = type === 'income'
      ? ['delivery']
      : ['fuel', 'food', 'maintenance', 'toll', 'other']

    const descriptions = type === 'income'
      ? language === 'ar'
        ? ['توصيل طلبات', 'طلب جاهز', 'توصيل كريم', 'توصيل نون']
        : ['Talabat delivery', 'Jahez order', 'Careem delivery', 'Noon delivery']
      : language === 'ar'
        ? ['محطة وقود', 'غداء/عشاء', 'غسيل سيارة', 'رسوم سالك']
        : ['Gas station', 'Lunch/Dinner', 'Car wash', 'Salik toll']

    addTransaction({
      type,
      amount: type === 'income' ? Math.floor(Math.random() * 100) + 50 : Math.floor(Math.random() * 30) + 10,
      category: categories[Math.floor(Math.random() * categories.length)] as any,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full min-h-screen bg-white md:max-w-md md:mx-auto relative">
        <Header />

        <main className="pb-20 px-4 pt-4">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'ar' ? 'المحفظة' : 'Wallet'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar' ? 'تتبع أرباحك ومصاريفك' : 'Track your earnings and expenses'}
            </p>
          </div>

          {/* Balance Summary */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white mb-6">
            <p className="text-sm opacity-90">
              {language === 'ar' ? 'إجمالي الربح اليوم' : "Today's Total Profit"}
            </p>
            <p className="text-3xl font-bold my-2">AED {todayProfit.toLocaleString()}</p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="opacity-90">{language === 'ar' ? 'الدخل' : 'Income'}</p>
                <p className="font-medium">AED {todayIncome.toLocaleString()}</p>
              </div>
              <div>
                <p className="opacity-90">{language === 'ar' ? 'المصاريف' : 'Expenses'}</p>
                <p className="font-medium">AED {todayExpense.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-3 mb-6">
            <button
              onClick={() => handleAddTransaction('income')}
              className="flex-1 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-center transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-800">
                {language === 'ar' ? 'إضافة دخل' : 'Add Income'}
              </span>
            </button>
            
            <button
              onClick={() => handleAddTransaction('expense')}
              className="flex-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg p-4 text-center transition-colors"
            >
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Minus className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-800">
                {language === 'ar' ? 'إضافة مصروف' : 'Add Expense'}
              </span>
            </button>
          </div>

          {/* Today's Transactions */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {language === 'ar' ? 'معاملات اليوم' : "Today's Transactions"}
            </h2>
            
            {todayTransactions.length > 0 ? (
              <div className="space-y-3">
                {todayTransactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    type={transaction.type}
                    amount={transaction.amount}
                    category={transaction.category as any}
                    notes={transaction.description}
                    date={transaction.time}
                    onDelete={() => deleteTransaction(transaction.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">
                  {language === 'ar' ? 'لا توجد معاملات' : 'No transactions'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' 
                    ? 'ابدأ بإضافة دخلك ومصاريفك اليومية'
                    : 'Start adding your daily income and expenses'
                  }
                </p>
              </div>
            )}
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}
