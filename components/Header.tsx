'use client'

import { useLanguage } from '@/context/useLanguage'
import { format } from 'date-fns'
import { arSA } from 'date-fns/locale'

export default function Header() {
  const { language } = useLanguage()
  
  const currentDate = format(new Date(), 'EEEE, MMMM d', {
    locale: language === 'ar' ? arSA : undefined,
  })

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            {language === 'ar' ? 'تطبيق زمام' : 'Zimam Delivery'}
          </h1>
          <p className="text-sm text-gray-600">
            {currentDate}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold">
              {language === 'ar' ? 'ع' : 'A'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
