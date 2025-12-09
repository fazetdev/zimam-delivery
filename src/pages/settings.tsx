import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/useLanguage'
import BottomNav from '@/components/BottomNav'
import Header from '@/components/Header'
import { Globe, Moon, Bell, Shield, Download, Trash2, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  if (!isClient) return null

  const toggleLanguage = () => setLanguage(language === 'ar' ? 'en' : 'ar')

  const settings = [
    {
      title: language === 'ar' ? 'اللغة' : 'Language',
      subtitle: language === 'ar' ? 'العربية / الإنجليزية' : 'Arabic / English',
      icon: Globe,
      action: toggleLanguage,
      value: language === 'ar' ? 'العربية' : 'English',
    },
    {
      title: language === 'ar' ? 'الوضع المظلم' : 'Dark Mode',
      subtitle: language === 'ar' ? 'مظهر داكن للمساء' : 'Dark appearance for night',
      icon: Moon,
      action: () => setDarkMode(!darkMode),
      value: darkMode ? (language === 'ar' ? 'مفعل' : 'On') : (language === 'ar' ? 'معطل' : 'Off'),
      toggle: true,
    },
    {
      title: language === 'ar' ? 'الإشعارات' : 'Notifications',
      subtitle: language === 'ar' ? 'تنبيهات الطلبات والتحديثات' : 'Order alerts and updates',
      icon: Bell,
      action: () => setNotifications(!notifications),
      value: notifications ? (language === 'ar' ? 'مفعل' : 'On') : (language === 'ar' ? 'معطل' : 'Off'),
      toggle: true,
    },
  ]

  const dataManagement = [
    {
      title: language === 'ar' ? 'تصدير البيانات' : 'Export Data',
      subtitle: language === 'ar' ? 'حفظ نسخة احتياطية' : 'Backup your data',
      icon: Download,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: language === 'ar' ? 'مسح البيانات' : 'Clear Data',
      subtitle: language === 'ar' ? 'حذف جميع السجلات' : 'Delete all records',
      icon: Trash2,
      color: 'text-red-600 bg-red-100',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full min-h-screen bg-white md:max-w-md md:mx-auto shadow-lg relative">
        <Header />

        <main className="pb-20 px-4 pt-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'ar' ? 'الإعدادات' : 'Settings'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'ar' ? 'تخصيص تطبيقك' : 'Customize your app'}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {language === 'ar' ? 'إعدادات التطبيق' : 'App Settings'}
            </h2>

            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
              {settings.map((setting, index) => {
                const Icon = setting.icon
                return (
                  <div key={setting.title} className={`px-4 py-4 ${index !== settings.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${setting.toggle ? 'bg-purple-100' : 'bg-blue-100'}`}>
                          <Icon size={20} className={setting.toggle ? 'text-purple-600' : 'text-blue-600'} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{setting.title}</p>
                          <p className="text-sm text-gray-600">{setting.subtitle}</p>
                        </div>
                      </div>

                      {setting.toggle ? (
                        <button
                          onClick={setting.action}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${setting.value.includes('On') ? 'bg-blue-600' : 'bg-gray-300'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${setting.value.includes('On') ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      ) : (
                        <button
                          onClick={setting.action}
                          className="px-4 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200"
                        >
                          {setting.value}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {language === 'ar' ? 'إدارة البيانات' : 'Data Management'}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {dataManagement.map((item) => {
                const Icon = item.icon
                return (
                  <button key={item.title} className="bg-white rounded-xl p-4 shadow border border-gray-100 text-center hover:bg-gray-50 transition">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${item.color}`}>
                      <Icon size={24} />
                    </div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {language === 'ar' ? 'الأمان والخصوصية' : 'Security & Privacy'}
            </h2>

            <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg mr-3 bg-green-100">
                  <Shield size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {language === 'ar' ? 'حماية البيانات' : 'Data Protection'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'بياناتك مخزنة محلياً فقط' : 'Your data is stored locally only'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {language === 'ar' ? 'عدد الطلبات المحفوظة' : 'Saved deliveries'}
                  </span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {language === 'ar' ? 'إجمالي المعاملات' : 'Total transactions'}
                  </span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {language === 'ar' ? 'آخر تحديث' : 'Last updated'}
                  </span>
                  <span className="font-medium">{language === 'ar' ? 'اليوم' : 'Today'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>Zimam Delivery v1.0.0</p>
            <p className="mt-1">
              {language === 'ar' ? 'مصمم خصيصاً لسائقي توصيل الخليج' : 'Designed specifically for Gulf delivery drivers'}
            </p>
          </div>

          <button className="mt-8 w-full flex items-center justify-center py-3 bg-gray-100 text-gray-800 rounded-xl font-medium hover:bg-gray-200 transition">
            <LogOut size={20} className="mr-2" />
            {language === 'ar' ? 'تسجيل الخروج' : 'Log Out'}
          </button>
        </main>

        <BottomNav />
      </div>
    </div>
  )
}
