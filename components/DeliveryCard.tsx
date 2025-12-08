'use client'

import { useLanguage } from '@/context/useLanguage'
import { MapPin, Clock, MessageSquare } from 'lucide-react'

type Platform = 'talabat' | 'jahez' | 'careem' | 'noon' | 'other'
type Language = 'en' | 'ar'

interface DeliveryCardProps {
  customer: string
  platform: Platform
  fee: number
  area: string
  notes?: string
  time: string
  onEdit?: () => void
  onDelete?: () => void
}

const platformColors: Record<Platform, string> = {
  talabat: 'bg-red-100 text-red-700 border-red-200',
  jahez: 'bg-orange-100 text-orange-700 border-orange-200',
  careem: 'bg-purple-100 text-purple-700 border-purple-200',
  noon: 'bg-blue-100 text-blue-700 border-blue-200',
  other: 'bg-gray-100 text-gray-700 border-gray-200',
}

const platformLabels: Record<Platform, Record<Language, string>> = {
  talabat: { en: 'Talabat', ar: 'طلبات' },
  jahez: { en: 'Jahez', ar: 'جاهز' },
  careem: { en: 'Careem', ar: 'كريم' },
  noon: { en: 'Noon', ar: 'نون' },
  other: { en: 'Other', ar: 'أخرى' },
}

export default function DeliveryCard({
  customer,
  platform,
  fee,
  area,
  notes,
  time,
  onEdit,
  onDelete,
}: DeliveryCardProps) {
  const { language } = useLanguage() as { language: Language }

  return (
    <div className="bg-white rounded-xl p-4 shadow border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{customer}</h3>
          <div className="flex items-center mt-1">
            <span className={`text-xs px-3 py-1 rounded-full border ${platformColors[platform]}`}>
              {platformLabels[platform][language]}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-600 flex items-center">
              <Clock size={12} className="mr-1" />
              {time}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-green-600">AED {fee}</p>
          <p className="text-xs text-gray-500">{language === 'ar' ? 'رسوم التوصيل' : 'Delivery Fee'}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center text-sm">
          <MapPin size={14} className="text-gray-400 mr-2" />
          <span className="text-gray-700">{area}</span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            {language === 'ar' ? 'منطقة التوصيل' : 'Delivery Area'}
          </p>
        </div>
      </div>

      {notes && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-start">
            <MessageSquare size={14} className="text-gray-400 mt-1 mr-2" />
            <p className="text-sm text-gray-600 flex-1">{notes}</p>
          </div>
        </div>
      )}

      {(onEdit || onDelete) && (
        <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-100">
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
