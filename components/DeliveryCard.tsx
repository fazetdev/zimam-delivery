'use client'

import { useLanguage } from '@/context/useLanguage'
import { MapPin, Clock, MessageSquare, Star, CheckCircle, Truck, Package } from 'lucide-react'

type Platform = 'talabat' | 'jahez' | 'careem' | 'noon' | 'other'
type Language = 'en' | 'ar'
type DeliveryStatus = 'completed' | 'in_progress' | 'cancelled'

export interface Delivery {
  id: string
  customer: string
  platform: Platform
  fee: number
  area: string
  notes: string
  time: string
  date: string
  status: DeliveryStatus
}

interface DeliveryCardProps {
  delivery: Delivery
  index?: number
  onEdit?: () => void
  onDelete?: () => void
}

const platformColors: Record<Platform, string> = {
  talabat: 'bg-red-500/10 text-red-700 border-red-200',
  jahez: 'bg-orange-500/10 text-orange-700 border-orange-200',
  careem: 'bg-purple-500/10 text-purple-700 border-purple-200',
  noon: 'bg-blue-500/10 text-blue-700 border-blue-200',
  other: 'bg-gray-500/10 text-gray-700 border-gray-200',
}

const platformIcons: Record<Platform, string> = {
  talabat: 'bg-gradient-to-r from-red-500 to-red-600',
  jahez: 'bg-gradient-to-r from-orange-500 to-orange-600',
  careem: 'bg-gradient-to-r from-purple-500 to-purple-600',
  noon: 'bg-gradient-to-r from-blue-500 to-blue-600',
  other: 'bg-gradient-to-r from-gray-500 to-gray-600',
}

const platformLabels: Record<Platform, Record<Language, string>> = {
  talabat: { en: 'Talabat', ar: 'طلبات' },
  jahez: { en: 'Jahez', ar: 'جاهز' },
  careem: { en: 'Careem', ar: 'كريم' },
  noon: { en: 'Noon', ar: 'نون' },
  other: { en: 'Other', ar: 'أخرى' },
}

const statusColors: Record<DeliveryStatus, string> = {
  completed: 'bg-green-100 text-green-800 border-green-200',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
}

const statusLabels: Record<DeliveryStatus, Record<Language, string>> = {
  completed: { en: 'Completed', ar: 'مكتمل' },
  in_progress: { en: 'In Progress', ar: 'قيد التنفيذ' },
  cancelled: { en: 'Cancelled', ar: 'ملغي' },
}

export default function DeliveryCard({ delivery, index = 0, onEdit, onDelete }: DeliveryCardProps) {
  const { language } = useLanguage()

  const formatCurrency = (amount: number) => {
    return `AED ${amount.toLocaleString()}`
  }

  return (
    <div 
      className="card overflow-hidden animate-slide-up group"
      style={{animationDelay: `${index * 100}ms`}}
    >
      <div className="p-5">
        {/* Header with platform and status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`${platformIcons[delivery.platform]} w-10 h-10 rounded-xl flex items-center justify-center mr-3`}>
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{delivery.customer}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${platformColors[delivery.platform]}`}>
                  {platformLabels[delivery.platform][language]}
                </span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[delivery.status]}`}>
                  {statusLabels[delivery.status][language]}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(delivery.fee)}</p>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'ar' ? 'أجرة التوصيل' : 'Delivery Fee'}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
              <MapPin className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{language === 'ar' ? 'المنطقة' : 'Area'}</p>
              <p className="font-medium text-gray-900">{delivery.area}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Clock className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{language === 'ar' ? 'الوقت' : 'Time'}</p>
              <p className="font-medium text-gray-900">{delivery.time}</p>
            </div>
          </div>
        </div>

        {/* Notes if available */}
        {delivery.notes && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="flex items-start">
              <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-gray-600 flex-1">{delivery.notes}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Package className="w-4 h-4 mr-2" />
            <span>
              {language === 'ar' ? 'رقم الطلب' : 'Order #'}{delivery.id.slice(-6)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-3 py-1.5 text-sm bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors font-medium"
              >
                {language === 'ar' ? 'تعديل' : 'Edit'}
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
              >
                {language === 'ar' ? 'حذف' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative gradient line */}
      <div className={`h-1 ${platformColors[delivery.platform].split(' ')[0]} opacity-60`}></div>
    </div>
  )
}
