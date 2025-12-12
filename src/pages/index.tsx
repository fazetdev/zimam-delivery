import { useEffect, useState } from "react";
import { useLanguage } from "@/context/useLanguage";
import { useLogbookSummary } from "@/context/useLogbook";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import DeliveryCard from "@/components/DeliveryCard";
import {
  Package,
  Clock,
  Star,
  ChevronRight,
  MapPin,
  Users,
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  Trophy,
  Award,
  Compass,
  Sparkles,
  Menu,
  Globe,
  Bell,
  Search,
} from "lucide-react";

// Added types to fix Vercel TypeScript error
type StatCardData = {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
};

type DashboardStatCardProps = {
  stat: StatCardData;
  language: string;
};

// Enhanced Dashboard Stat Card with animations
const DashboardStatCard = ({ stat, language }: DashboardStatCardProps) => {
  const Icon = stat.icon;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target =
      parseFloat(stat.value.replace("AED ", "").replace("m", "")) || 0;
    const duration = 1000; // ms
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
      {/* Premium Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>

      {/* Animated Glow Effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500 group-hover:duration-200`}
      ></div>

      <div className="relative p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div
            className={`p-2 md:p-3 rounded-xl md:rounded-2xl ${stat.color} bg-gradient-to-br ${stat.gradient} shadow-lg transform transition-transform group-hover:scale-110`}
          >
            <Icon size={20} className="text-white" />
          </div>
          <span className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 md:px-3 py-1 rounded-full">
            {stat.title}
          </span>
        </div>
        <p className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-1 md:mb-2">
          {stat.title.includes("Earnings") || stat.title.includes("أرباح")
            ? `AED ${count.toLocaleString()}`
            : stat.title.includes("Rating") || stat.title.includes("تقييم")
              ? "4.8"
              : stat.value.includes("AED")
                ? `AED ${count.toLocaleString()}`
                : stat.value.includes("m")
                  ? `${count}m`
                  : count.toString()}
        </p>
        <div className="flex items-center">
          <div className="flex items-center px-2 md:px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-xs font-bold">
            <Target size={10} className="mr-1" />
            <span className="text-xs">
              {language === "ar" ? "+12% هذا الشهر" : "+12% this month"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const { language, setLanguage } = useLanguage();
  const { todayDeliveries, todayEarnings } = useLogbookSummary();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // Simulate loading for skeleton effect
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Add toggle function if you need it
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  // This check should be HERE, inside the component
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 border-4 border-emerald-500 border-l-transparent rounded-full animate-spin mx-auto animation-delay-1000"></div>
          </div>
          <p className="mt-4 md:mt-6 text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            {language === "ar"
              ? "تحميل زمام دليفري..."
              : "Loading Zimam Delivery..."}
          </p>
        </div>
      </div>
    );
  }

  const todaysStats = [
    {
      title: language === "ar" ? "طلبات اليوم" : "Today's Deliveries",
      value: todayDeliveries.length.toString(),
      icon: Package,
      color: "bg-gradient-to-br from-blue-500 to-cyan-400",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      title: language === "ar" ? "أرباح اليوم" : "Today's Earnings",
      value: `AED ${todayEarnings.toLocaleString()}`,
      icon: CheckCircle,
      color: "bg-gradient-to-br from-emerald-500 to-green-400",
      gradient: "from-emerald-500 to-green-400",
    },
    {
      title: language === "ar" ? "تقييم النجوم" : "Star Rating",
      value: "4.8",
      icon: Star,
      color: "bg-gradient-to-br from-amber-500 to-yellow-400",
      gradient: "from-amber-500 to-yellow-400",
    },
    {
      title: language === "ar" ? "سرعة التوصيل" : "Delivery Speed",
      value: "32m",
      icon: Zap,
      color: "bg-gradient-to-br from-purple-500 to-pink-400",
      gradient: "from-purple-500 to-pink-400",
    },
  ];

  // Loading skeleton for better UX
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Skeleton Header */}
          <div className="h-16 flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="flex gap-3">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton Hero */}
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl mt-4 animate-pulse"></div>

          {/* Skeleton Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>

          {/* Skeleton Missions */}
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl mt-6 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements - Reduced opacity for better readability */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 md:w-72 md:h-72 bg-emerald-300 dark:bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header with Gulf luxury styling */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md px-4 py-3 flex items-center justify-between md:px-8 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-gray-900 dark:text-white">
              {language === "ar" ? "زمام دليفري" : "Zimam Delivery"}
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Search size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <Bell size={20} className="text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
            >
              <Globe size={20} className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {language === "ar" ? "EN" : "AR"}
              </span>
            </button>
            <button className="md:hidden p-2">
              <Menu size={24} className="text-gray-600 dark:text-gray-300" />
            </button>
            <nav className="hidden md:flex gap-6">
              <a
                href="/missions"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                {language === "ar" ? "المهام" : "Missions"}
              </a>
              <a
                href="/earnings"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
              >
                {language === "ar" ? "الأرباح" : "Earnings"}
              </a>
            </nav>
          </div>
        </header>

        <main className="pb-24 md:pb-8 pt-6 md:pt-8">
          {/* Welcome Banner - Gulf Inspired Luxury Design with enhanced responsiveness */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-700 to-emerald-800 dark:from-gray-800 dark:via-gray-700 dark:to-emerald-900 p-6 md:p-8 text-white shadow-2xl mb-6 md:mb-8 transform transition-all duration-500 hover:shadow-3xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-24 translate-x-24 md:-translate-y-32 md:translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full translate-y-24 -translate-x-24 md:translate-y-32 md:-translate-x-32"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 mr-3" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-2 border-yellow-400 rounded-full animate-ping"></div>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                  {language === "ar"
                    ? "مرحباً، البطل!"
                    : "Welcome back, Champion!"}
                </h1>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-lg md:text-xl text-blue-100 dark:text-blue-200 mb-2">
                    {language === "ar"
                      ? "🏆 أنت ضمن أفضل ١٠٪ من مندوبي التوصيل هذا الشهر!"
                      : "🏆 You're in the top 10% of delivery agents this month!"}
                  </p>
                  <p className="text-base md:text-lg text-emerald-200 dark:text-emerald-300 font-medium">
                    {language === "ar"
                      ? `لديك ${todayDeliveries.length} مهمة ⚡ تنتظر الإنجاز`
                      : `${todayDeliveries.length} high-priority missions ⚡ await your expertise`}
                  </p>
                </div>
                <button className="mt-2 md:mt-0 px-6 py-3 md:px-8 md:py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center w-full md:w-auto">
                  <Sparkles className="mr-2" size={20} />
                  {language === "ar" ? "ابدأ الجولة 🚀" : "Start Mission 🚀"}
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid with enhanced responsiveness */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* COLUMN 1 & 2: Main Content */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Today's Stats - Enhanced with Responsive Layout */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {todaysStats.map((stat) => (
                  <DashboardStatCard
                    key={stat.title}
                    stat={stat}
                    language={language}
                  />
                ))}
              </div>

              {/* Today's Deliveries - Premium Design with swipe gestures hint */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 border border-white/20 dark:border-gray-700/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <Compass
                        className="mr-3 text-blue-600 dark:text-blue-400"
                        size={24}
                      />
                      {language === "ar" ? "مهام اليوم" : "Today's Missions"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
                      {language === "ar"
                        ? "طلباتك ذات الأولوية القصوى - اسحب لقبول الطلب"
                        : "Your high-priority delivery missions - Swipe to accept"}
                    </p>
                  </div>
                  <button className="mt-4 sm:mt-0 px-4 py-2 md:px-6 md:py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 flex items-center w-full sm:w-auto justify-center">
                    {language === "ar" ? "عرض الخريطة 🗺️" : "View Map 🗺️"}
                    <ChevronRight
                      size={16}
                      className={language === "ar" ? "mr-2" : "ml-2"}
                    />
                  </button>
                </div>

                {todayDeliveries.length > 0 ? (
                  <div className="space-y-3 md:space-y-4 overflow-y-auto max-h-[50vh] md:max-h-none">
                    {todayDeliveries.slice(0, 5).map((delivery, index) => (
                      <div
                        key={delivery.id}
                        className="transform transition-all duration-300 hover:scale-[1.01]"
                      >
                        <DeliveryCard delivery={delivery} index={index} />
                      </div>
                    ))}

                    {todayDeliveries.length > 5 && (
                      <button className="w-full py-3 md:py-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 font-medium group">
                        <div className="flex items-center justify-center">
                          <span className="text-sm md:text-base">
                            {language === "ar"
                              ? `🔄 عرض ${todayDeliveries.length - 5} مهمة أخرى`
                              : `🔄 View ${todayDeliveries.length - 5} more missions`}
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 md:p-10 text-center shadow-inner">
                    <div className="inline-flex p-3 md:p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl mb-4">
                      <Package className="w-12 h-12 md:w-16 md:h-16 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {language === "ar"
                        ? "🎯 جاهز للانطلاق!"
                        : "🎯 Ready for Action!"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-sm md:text-base">
                      {language === "ar"
                        ? "لا توجد مهام حالياً. سيكون هناك مهام جديدة قريباً. استعد للانطلاق!"
                        : "No active missions right now. New high-value deliveries will appear soon. Stay prepared!"}
                    </p>
                    <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all">
                      {language === "ar" ? "تحديث المهام" : "Refresh Missions"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* COLUMN 3: Sidebar - Gulf Inspired with mobile accordion */}
            <div className="lg:col-span-1 space-y-4 md:space-y-6 lg:space-y-8">
              {/* Quick Actions - Premium Design */}
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-4 md:p-6 border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center mb-4 md:mb-6">
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-amber-500 mr-3" />
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    {language === "ar" ? "الأوامر السريعة" : "Command Center"}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <button className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-100 dark:border-gray-700 rounded-xl p-4 md:p-5 hover:border-blue-300 dark:hover:border-blue-500 hover:from-blue-100 dark:hover:from-blue-900/30 hover:to-cyan-100 dark:hover:to-cyan-900/30 transition-all duration-300 transform hover:scale-105">
                    <div className="flex flex-col items-center">
                      <div className="p-2 md:p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5 md:w-7 md:h-7 text-white" />
                      </div>
                      <span className="text-xs md:text-sm font-semibold text-gray-800 dark:text-white">
                        {language === "ar" ? "خرائط ذكية" : "Smart Maps"}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {language === "ar" ? "مسار مثالي" : "Optimal Route"}
                      </span>
                    </div>
                  </button>

                  <button className="group relative bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-900 border-2 border-emerald-100 dark:border-gray-700 rounded-xl p-4 md:p-5 hover:border-emerald-300 dark:hover:border-emerald-500 hover:from-emerald-100 dark:hover:from-emerald-900/30 hover:to-green-100 dark:hover:to-green-900/30 transition-all duration-300 transform hover:scale-105">
                    <div className="flex flex-col items-center">
                      <div className="p-2 md:p-3 bg-gradient-to-br from-emerald-500 to-green-400 rounded-xl mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                        <Users className="w-5 h-5 md:w-7 md:h-7 text-white" />
                      </div>
                      <span className="text-xs md:text-sm font-semibold text-gray-800 dark:text-white">
                        {language === "ar" ? "فريق النخبة" : "Elite Team"}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {language === "ar" ? "التواصل المباشر" : "Direct Connect"}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Performance Tips - Gulf Luxury Style with tooltip */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-amber-200 dark:border-amber-800 p-4 md:p-6 shadow-xl">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full -translate-y-12 translate-x-12 md:-translate-y-16 md:translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="p-1 md:p-2 bg-gradient-to-br from-amber-500 to-yellow-400 rounded-lg">
                      <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div
                      className={
                        language === "ar" ? "mr-2 md:mr-3" : "ml-2 md:ml-3"
                      }
                    >
                      <p className="font-bold text-gray-900 dark:text-white text-base md:text-lg">
                        {language === "ar" ? "💎 نصيحة النخبة" : "💎 Elite Tip"}
                      </p>
                      <p className="text-xs md:text-sm text-amber-700 dark:text-amber-300 font-medium">
                        {language === "ar"
                          ? "للمحترفين فقط"
                          : "For Professionals"}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    {language === "ar"
                      ? 'استخدم ميزة "المسار الذكي" في ساعة الذروة لتوفير ١٥ دقيقة في كل رحلة وتزيد أرباحك ٢٠٪.'
                      : "Use Smart Routing during peak hours to save 15 minutes per trip and increase earnings by 20%. Premium customers appreciate punctuality!"}
                  </p>
                  <button
                    className="mt-3 md:mt-4 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs md:text-sm font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105"
                    title={
                      language === "ar"
                        ? "تفعيل المسار الذكي"
                        : "Activate Smart Route"
                    }
                  >
                    {language === "ar"
                      ? "تفعيل المسار الذكي →"
                      : "Activate Smart Route →"}
                  </button>
                </div>
              </div>

              {/* Daily Challenge with progress animation */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-100 dark:border-purple-800 p-4 md:p-6 shadow-xl">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg">
                    {language === "ar"
                      ? "🏅 التحدي اليومي"
                      : "🏅 Daily Challenge"}
                  </h3>
                  <div className="px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold rounded-full">
                    {language === "ar" ? "٨٥٪" : "85%"}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2 md:mb-3 text-sm md:text-base">
                  {language === "ar"
                    ? "أكمل ٥٠ توصيل هذا الأسبوع واربح مكافأة إضافية بقيمة ٥٠٠ درهم!"
                    : "Complete 50 deliveries this week to earn an extra AED 500 bonus!"}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 md:h-2 mb-3 md:mb-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-400 h-1.5 md:h-2 rounded-full transition-all duration-1000"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 text-center">
                  {language === "ar" ? "٤٢/٥٠ مكتمل" : "42/50 completed"}
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation - Enhanced with safe area and badges */}
        <div className="fixed bottom-0 left-0 right-0 z-50 pb-4 md:pb-0 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent">
          <div className="max-w-7xl mx-auto px-4">
            <BottomNav />
          </div>
        </div>
      </div>

      {/* Dark mode toggle floating button */}
      <button className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
        <span className="text-white text-2xl">🌙</span>
      </button>
    </div>
  );
} // <-- THIS IS THE CLOSING BRACE THAT WAS MISSING