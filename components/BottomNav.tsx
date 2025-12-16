'use client';

import { useLanguage } from '@/context/useLanguage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, BookOpen, Wallet, Settings } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define types for navigation items
interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  labelShort: string;
}

export default function BottomNav() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');
  
  // Safely get language with proper error handling
  let language = 'en';
  try {
    const languageContext = useLanguage?.();
    language = languageContext?.language || 'en';
  } catch (error) {
    console.warn('Language context not available:', error);
  }
  
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    setActiveTab(pathname);
  }, [pathname]);

  // Fallback navigation items if language context fails
  const navItems: NavItem[] = [
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

  // Don't render on server to avoid hydration issues
  if (!isMounted) {
    return (
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-50 lg:hidden"
        aria-hidden="true"
      >
        {/* Skeleton loader for consistent spacing */}
        <div className="flex justify-between items-center w-full max-w-lg mx-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center flex-grow">
              <div className="p-2 rounded-lg bg-gray-200 animate-pulse">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
              </div>
              <div className="h-3 w-12 bg-gray-200 rounded mt-1 animate-pulse"></div>
            </div>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200/80 py-3 px-4 z-50 lg:hidden safe-bottom"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{
        // Handle mobile browser bottom bars (iOS, Android)
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
      }}
    >
      <div className="flex justify-between items-center w-full max-w-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.href;

          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-grow min-w-0 px-1 ${
                language === 'ar' ? 'mx-1' : 'mx-1'
              }`}
              onClick={() => setActiveTab(item.href)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div 
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span 
                className={`text-[11px] font-medium mt-1 transition-all duration-300 truncate w-full text-center ${
                  isActive 
                    ? 'text-blue-600 font-semibold scale-105' 
                    : 'text-gray-600'
                }`}
                style={{
                  fontSize: 'clamp(10px, 2.5vw, 12px)',
                }}
              >
                {item.labelShort}
              </span>
              
              {/* Active indicator dot */}
              {isActive && (
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}