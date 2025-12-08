'use client';
import { useLanguage } from '@/context/useLanguage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const { language } = useLanguage();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow p-2 flex justify-around">
      <p className="text-sm">Current language: {language}</p>
      <Link href="/" className={pathname === '/' ? 'font-bold' : ''}>Home</Link>
      <Link href="/settings" className={pathname === '/settings' ? 'font-bold' : ''}>Settings</Link>
    </nav>
  );
}
