import { useState } from 'react'
import { useLanguage } from '@/context/useLanguage'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import { MapPin, Navigation, Compass, Target } from 'lucide-react'

export default function MapPage() {
  const { language } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useState(() => {
    setIsClient(true)
  })

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg relative">
        <Header />
        
        <main className="pb-20 px-4 pt-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <MapPin className="mr-2" />
              {language === 'ar' ? 'خريطة العناوين' : 'Address Map'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar' ? 'حفظ وتذكر العناوين المهمة' : 'Save and remember important addresses'}
            </p>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-dashed border-blue-300 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Navigation size={48} className="text-blue-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {language === 'ar' ? 'قريباً!' : 'Coming Soon!'}
            </h2>
            
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {language === 'ar' 
                ? 'نعمل على إضافة نظام الخرائط المتقدم مع حفظ العناوين المفضلة وتحديد المواقع. هذه الميزة ستكون متاحة قريباً في التحديث القادم.' 
                : 'We are working on adding advanced mapping system with saved addresses and location pinning. This feature will be available soon in the next update.'}
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-blue-600 font-bold text-lg mb-1 flex justify-center">
                  <Target size={24} />
                </div>
                <p className="text-sm font-medium">
                  {language === 'ar' ? 'حفظ العناوين' : 'Save Addresses'}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-blue-600 font-bold text-lg mb-1 flex justify-center">
                  <MapPin size={24} />
                </div>
                <p className="text-sm font-medium">
                  {language === 'ar' ? 'تحديد المواقع' : 'Pin Locations'}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-blue-600 font-bold text-lg mb-1 flex justify-center">
                  <Compass size={24} />
                </div>
                <p className="text-sm font-medium">
                  {language === 'ar' ? 'إضافة صور' : 'Add Photos'}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="text-blue-600 font-bold text-lg mb-1 flex justify-center">
                  <Navigation size={24} />
                </div>
                <p className="text-sm font-medium">
                  {language === 'ar' ? 'تتبع المسار' : 'Track Routes'}
                </p>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow">
              {language === 'ar' ? 'إشعارني عند التحديث' : 'Notify me on update'}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow border text-center">
              <p className="text-2xl font-bold text-gray-800">0</p>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'عنوان محفوظ' : 'Saved Addresses'}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border text-center">
              <p className="text-2xl font-bold text-gray-800">0</p>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'منطقة' : 'Areas'}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border text-center">
              <p className="text-2xl font-bold text-gray-800">0</p>
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'صورة' : 'Photos'}
              </p>
            </div>
          </div>
        </main>
        
        <BottomNav />
      </div>
    </div>
  )
}
