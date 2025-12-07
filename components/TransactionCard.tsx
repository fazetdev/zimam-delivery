'use client'

import { useLanguage } from '@/context/useLanguage'
import { TrendingUp, TrendingDown, Fuel, Utensils, Wrench, CreditCard, MoreHorizontal } from 'lucide-react'

interface TransactionCardProps {
  type: 'income' | 'expense'
  amount: number
  category: 'delivery' | 'fuel' | 'food' | 'maintenance' | 'toll' | 'other'
  description: string
  time: string
  onDelete?: () => void
  onEdit?: () => void
}

const categoryIcons = {
  delivery: TrendingUp,
  fuel: Fuel,
  food: Utensils,
  maintenance: Wrench,
  toll: CreditCard,
  other: MoreHorizontal,
}

const categoryColors = {
  delivery: 'bg-green-100 text-green-600',
  fuel: 'bg-red-100 text-red-600',
  food: 'bg-orange-100 text-orange-600',
  maintenance: 'bg-purple-100 text-purple-600',
  toll: 'bg-blue-100 text-blue-600',
  other: 'bg-gray-100 text-gray-600',
}

const categoryLabels = {
  delivery: { en: 'Delivery', ar: 'توصيل' },
  fuel: { en: 'Fuel', ar: 'وقود' },
  food: { en: 'Food', ar: 'طعام' },
  maintenance: { en: 'Maintenance', ar: 'صيانة' },
  toll: { en: 'Toll', ar: 'رسوم' },
  other: { en: 'Other', ar: 'أخرى' },
}

export default function TransactionCard({
  type,
  amount,
  category,
  description,
  time,
  onDelete,
  onEdit,
}: TransactionCardProps) {
  const { language } = useLanguage()
  const Icon = categoryIcons[category]

  return (
    <div className="bg-white rounded-xl p-4 shadow border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg mr-3 ${categoryColors[category]}`}>
            <Icon size={20} />
          </div>
          
          <div>
            <div className="flex items-center">
              <h4 className="font-medium text-gray-800">
                {categoryLabels[category][language]}
              </h4>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {type === 'income' 
                  ? (language === 'ar' ? 'دخل' : 'Income') 
                  : (language === 'ar' ? 'مصروف' : 'Expense')
                }
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mt-1">{description}</p>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <Clock size={12} className="mr-1" />
              {time}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className={`text-lg font-bold ${
            type === 'income' ? 'text-green-600' : 'text-red-600'
          }`}>
            {type === 'income' ? '+' : '-'}AED {amount}
          </p>
          
          {(onEdit || onDelete) && (
            <div className="flex space-x-2 mt-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  {language === 'ar' ? 'حذف' : 'Delete'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Need to import Clock from lucide
import { Clock } from 'lucide-react'
