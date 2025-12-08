'use client'

import { useLanguage } from '@/context/useLanguage'

interface TransactionCardProps {
  category: 'delivery' | 'fuel' | 'food' | 'maintenance' | 'toll' | 'shopping' | 'transport' | 'other'
  type: 'income' | 'expense'
  amount: number
  notes?: string
  date: string
  onEdit?: () => void
  onDelete?: () => void
}

type Language = 'en' | 'ar'

const categoryLabels: Record<TransactionCardProps['category'], { en: string; ar: string }> = {
  delivery: { en: 'Delivery', ar: 'توصيل' },
  fuel: { en: 'Fuel', ar: 'وقود' },
  food: { en: 'Food', ar: 'طعام' },
  maintenance: { en: 'Maintenance', ar: 'صيانة' },
  toll: { en: 'Toll', ar: 'رسوم' },
  shopping: { en: 'Shopping', ar: 'تسوق' },
  transport: { en: 'Transport', ar: 'مواصلات' },
  other: { en: 'Other', ar: 'أخرى' },
}

export default function TransactionCard({
  category,
  type,
  amount,
  notes,
  date,
  onEdit,
  onDelete,
}: TransactionCardProps) {
  const { language } = useLanguage() as { language: Language }

  return (
    <div className="bg-white rounded-xl p-4 shadow border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-800">{categoryLabels[category][language]}</h4>
        <p className={`text-sm font-semibold ${
          type === 'income' ? 'text-green-600' : 'text-red-600'
        }`}>
          AED {amount}
        </p>
      </div>
      {notes && <p className="text-xs text-gray-500 mb-2">{notes}</p>}
      <p className="text-xs text-gray-400">{date}</p>

      {(onEdit || onDelete) && (
        <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-gray-100">
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              {language === 'ar' ? 'تعديل' : 'Edit'}
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              {language === 'ar' ? 'حذف' : 'Delete'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
