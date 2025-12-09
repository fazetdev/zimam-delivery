'use client';
import { useLanguage } from '@/context/useLanguage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, BookOpen, Wallet, Settings } from 'lucide-react';

export default function BottomNav() {
  const { language } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    // ... navItems array remains the same ...
    { href: '/', icon: Home, label: language === 'ar' ? 'الرئيسية' : 'Home', labelShort: language === 'ar' ? 'رئيسية' : 'Home' },
    { href: '/map', icon: Map, label: language === 'ar' ? 'الخريطة' : 'Map', labelShort: language === 'ar' ? 'خريطة' : 'Map' },
    { href: '/logbook', icon: BookOpen, label: language === 'ar' ? 'سجل الرحلات' : 'Logbook', labelShort: language === 'ar' ? 'سجل' : 'Log' },
    { href: '/wallet', icon: Wallet, label: language === 'ar' ? 'المحفظة' : 'Wallet', labelShort: language === 'ar' ? 'محفظة' : 'Wallet' },
    { href: '/settings', icon: Settings, label: language === 'ar' ? 'الإعدادات' : 'Settings', labelShort: language === 'ar' ? 'إعدادات' : 'Settings' },
  ];

  return (
    // FIX 1: Add lg:hidden to hide it on desktop/large screens
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-50 lg:hidden"
         // FIX 2: Add explicit direction for better RTL handling
         dir={language === 'ar' ? 'rtl' : 'ltr'}> 
      
      {/* REMOVED md:max-w-md md:mx-auto from this div */}
      <div className="flex justify-between items-center w-full max-w-lg mx-auto"> 
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link 
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center flex-grow" // Use flex-grow for better spacing
            >
              <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}>
                <Icon size={20} />
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                {item.labelShort}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
