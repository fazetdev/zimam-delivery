import { useState } from 'react'
import { useLanguage } from '@/context/useLanguage'
import { useWallet, useWalletSummary } from '@/context/useWallet'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import TransactionCard from '@/components/TransactionCard'
import StatsCard from '@/components/StatsCard'
import { Plus, Minus, TrendingUp, TrendingDown } from 'lucide-react'

export default function WalletPage() {
  const { language } = useLanguage()
  const { addTransaction, deleteTransaction } = useWallet()
  const { todayIncome, todayExpense, todayProfit, todayTransactions, weeklySummary } = useWalletSummary()
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
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg relative">
        <Header />
        
        <main className="pb-20 px-4 pt-4">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'ar' ? 'المحفظة اليومية' : 'Daily Wallet'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar' ? 'تتبع دخلك ومصاريفك' : 'Track your income and expenses'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatsCard
              title={language === 'ar' ? 'إجمالي الدخل' : 'Total Income'}
              value={`AED ${todayIncome}`}
              icon={TrendingUp}
              color="green"
            />
            <StatsCard
              title={language === 'ar' ? 'إجمالي المصروف' : 'Total Expense'}
              value={`AED ${todayExpense}`}
              icon={TrendingDown}
              color="red"
            />
          </div>

          {/* Profit Card */}
          <div className={`rounded-2xl p-6 text-white mb-6 ${
            todayProfit >= 0 
              ? 'bg-gradient-to-r from-green-600 to-green-700' 
              : 'bg-gradient-to-r from-red-600 to-red-700'
          }`}>
            <p className="text-sm opacity-90">
              {language === 'ar' ? 'ربح اليوم' : "Today's Profit"}
            </p>
            <p className="text-4xl font-bold my-2">AED {todayProfit}</p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="opacity-90">{language === 'ar' ? 'الدخل' : 'Income'}</p>
                <p className="font-semibold">AED {todayIncome}</p>
              </div>
              <div>
                <p className="opacity-90">{language === 'ar' ? 'المصاريف' : 'Expenses'}</p>
                <p className="font-semibold">AED {todayExpense}</p>
              </div>
            </div>
          </div>

          {/* Weekly Summary Preview */}
          {weeklySummary.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow border border-gray-100 mb-6">
              <h3 className="font-medium text-gray-800 mb-3">
                {language === 'ar' ? 'ملخص الأسبوع' : 'Weekly Summary'}
              </h3>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {weeklySummary.map((day, index) => (
                  <div key={index} className="flex-shrink-0 w-16 text-center">
                    <div className={`h-12 rounded-lg flex items-center justify-center ${
                      day.profit >= 0 ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      <span className={`text-sm font-bold ${
                        day.profit >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        AED {day.profit}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex space-x-4 mb-6">
            <button 
              onClick={() => handleAddTransaction('income')}
              className="flex-1 bg-green-100 text-green-700 py-3 rounded-xl font-medium flex items-center justify-center hover:bg-green-200 transition shadow"
            >
              <Plus size={20} className="mr-2" />
              {language === 'ar' ? 'إضافة دخل' : 'Add Income'}
            </button>
            <button 
              onClick={() => handleAddTransaction('expense')}
              className="flex-1 bg-red-100 text-red-700 py-3 rounded-xl font-medium flex items-center justify-center hover:bg-red-200 transition shadow"
            >
              <Minus size={20} className="mr-2" />
              {language === 'ar' ? 'إضافة مصروف' : 'Add Expense'}
            </button>
          </div>

          {/* Transaction List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'ar' ? 'المعاملات اليوم' : "Today's Transactions"}
              </h3>
              <span className="text-sm text-gray-500">
                {todayTransactions.length} {language === 'ar' ? 'معاملة' : 'transactions'}
              </span>
            </div>

            {todayTransactions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp size={24} className="text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  {language === 'ar' ? 'لا توجد معاملات' : 'No transactions yet'}
                </h4>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'ابدأ بإضافة دخل أو مصروف لليوم' 
                    : 'Start by adding income or expense for today'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
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
            )}
          </div>
        </main>
        
        <BottomNav />
      </div>
    </div>
  )
}
