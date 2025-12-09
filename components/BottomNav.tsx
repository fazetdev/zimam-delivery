'use client';
import { useLanguage } from '@/context/useLanguage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, BookOpen, Wallet, Settings } from 'lucide-react';

export default function BottomNav() {
  const { language } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { 
      href: '/', 
      icon: Home, 
      label: language === 'ar' ? 'الرئيسية' : 'Home',
      labelShort: language === 'ar' ? 'رئيسية' : 'Home'
    },
    { 
      href: '/map', 
      icon: Map, 
      label: language === 'ar' ? 'الخريطة' : 'Map',
      labelShort: language === 'ar' ? 'خريطة' : 'Map'
    },
    { 
      href: '/logbook', 
      icon: BookOpen, 
      label: language === 'ar' ? 'سجل الرحلات' : 'Logbook',
      labelShort: language === 'ar' ? 'سجل' : 'Log'
    },
    { 
      href: '/wallet', 
      icon: Wallet, 
      label: language === 'ar' ? 'المحفظة' : 'Wallet',
      labelShort: language === 'ar' ? 'محفظة' : 'Wallet'
    },
    { 
      href: '/settings', 
      icon: Settings, 
      label: language === 'ar' ? 'الإعدادات' : 'Settings',
      labelShort: language === 'ar' ? 'إعدادات' : 'Settings'
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-50">
      <div className="flex justify-between items-center w-full md:max-w-md md:mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-16"
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
