// Gulf Delivery Mock Data for Zimam App
// Authentic GCC delivery scenarios

// ============== TYPES ==============
export type Platform = 'talabat' | 'jahez' | 'careem' | 'noon' | 'other'
export type TransactionType = 'income' | 'expense'
export type ExpenseCategory = 'fuel' | 'food' | 'maintenance' | 'toll' | 'other'
export type DeliveryStatus = 'completed' | 'in_progress' | 'cancelled'

// ============== GCC CITIES & AREAS ==============
export const GCC_CITIES = {
  UAE: [
    { name: 'Dubai Marina', emoji: '🏙️' },
    { name: 'Downtown Dubai', emoji: '🗼' },
    { name: 'Jumeirah', emoji: '🏖️' },
    { name: 'Deira', emoji: '🏬' },
    { name: 'Bur Dubai', emoji: '🕌' },
    { name: 'Al Barsha', emoji: '🏘️' },
    { name: 'Abu Dhabi City', emoji: '🕌' },
    { name: 'Al Ain', emoji: '🌴' },
    { name: 'Sharjah', emoji: '📚' },
    { name: 'Ajman', emoji: '🌅' }
  ],
  SAUDI_ARABIA: [
    { name: 'Riyadh KAFD', emoji: '🏢' },
    { name: 'Olaya', emoji: '🛍️' },
    { name: 'Al Nakheel', emoji: '🌴' },
    { name: 'Jeddah Corniche', emoji: '🌊' },
    { name: 'Al Khobar', emoji: '⛽' },
    { name: 'Dhahran', emoji: '🛢️' },
    { name: 'Makkah', emoji: '🕋' },
    { name: 'Medina', emoji: '🕌' }
  ],
  QATAR: [
    { name: 'Doha West Bay', emoji: '🌆' },
    { name: 'Al Sadd', emoji: '🏢' },
    { name: 'Al Waab', emoji: '🏘️' },
    { name: 'Lusail', emoji: '🏙️' },
    { name: 'The Pearl', emoji: '⛵' },
    { name: 'Education City', emoji: '🎓' }
  ],
  OMAN: [
    { name: 'Muscat', emoji: '🏔️' },
    { name: 'Al Khuwair', emoji: '🏢' },
    { name: 'Ruwi', emoji: '🏬' },
    { name: 'Qurum', emoji: '🌊' },
    { name: 'Seeb', emoji: '✈️' }
  ],
  BAHRAIN: [
    { name: 'Manama', emoji: '🏙️' },
    { name: 'Juffair', emoji: '⛵' },
    { name: 'Riffa', emoji: '🏘️' },
    { name: 'Muharraq', emoji: '🏛️' }
  ],
  KUWAIT: [
    { name: 'Kuwait City', emoji: '🏙️' },
    { name: 'Salmiya', emoji: '🛍️' },
    { name: 'Hawally', emoji: '🏘️' },
    { name: 'Farwaniya', emoji: '🏢' }
  ]
}

// ============== DELIVERY PLATFORMS ==============
export const DELIVERY_PLATFORMS: Record<Platform, {
  name: { en: string, ar: string }
  color: string
  logoColor: string
  feeRange: { min: number, max: number }
}> = {
  talabat: {
    name: { en: 'Talabat', ar: 'طلبات' },
    color: 'bg-red-100 text-red-700 border-red-200',
    logoColor: '#E31D2A',
    feeRange: { min: 8, max: 20 }
  },
  jahez: {
    name: { en: 'Jahez', ar: 'جاهز' },
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    logoColor: '#FF6B00',
    feeRange: { min: 10, max: 25 }
  },
  careem: {
    name: { en: 'Careem', ar: 'كريم' },
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    logoColor: '#5C2D91',
    feeRange: { min: 12, max: 30 }
  },
  noon: {
    name: { en: 'Noon', ar: 'نون' },
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    logoColor: '#0072BC',
    feeRange: { min: 15, max: 35 }
  },
  other: {
    name: { en: 'Other', ar: 'أخرى' },
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    logoColor: '#6B7280',
    feeRange: { min: 5, max: 15 }
  }
}

// ============== GULF DRIVER NAMES ==============
export const GULF_NAMES = {
  male: [
    'Ahmed Al-Mansoori', 'Mohammed Al-Harbi', 'Khalid Al-Qasimi', 'Omar Al-Balushi',
    'Abdullah Al-Zahrani', 'Yousef Al-Ghamdi', 'Hassan Al-Mutairi', 'Fahad Al-Otaibi',
    'Saeed Al-Shammari', 'Ibrahim Al-Kuwari', 'Salem Al-Mazroui', 'Rashid Al-Nuaimi',
    'Majid Al-Rashidi', 'Nasser Al-Suwaidi', 'Hamad Al-Thani', 'Sultan Al-Hajri'
  ],
  female: [
    'Fatima Al-Zahrani', 'Mariam Al-Kuwari', 'Noura Al-Mansoori', 'Aisha Al-Harbi',
    'Sarah Al-Ghamdi', 'Layla Al-Mutairi', 'Hessa Al-Otaibi', 'Amal Al-Shammari',
    'Reem Al-Qasimi', 'Dalal Al-Balushi', 'Shaikha Al-Mazroui', 'Mona Al-Nuaimi',
    'Nada Al-Rashidi', 'Hind Al-Suwaidi', 'Alanood Al-Thani', 'Shamma Al-Hajri'
  ]
}

// ============== COMMON DELIVERY NOTES ==============
export const DELIVERY_NOTES = {
  en: [
    'Call on arrival',
    'Gate code 1234',
    'Building 5, 3rd floor',
    'No elevator, please call',
    'Security pass required',
    'Park in visitor parking',
    'Ring bell twice',
    'Leave at reception',
    'Hand to customer only',
    'Apartment 304',
    'Villa 45, blue gate',
    'Use side entrance',
    'Office building',
    'Shopping mall delivery',
    'Hospital delivery - main entrance'
  ],
  ar: [
    'الاتصال عند الوصول',
    'رمز البوابة 1234',
    'المبنى 5، الطابق الثالث',
    'لا يوجد مصعد، يرجى الاتصال',
    'مطلوب تصريح أمني',
    'الانتظار في موقف الزوار',
    'دق الجرس مرتين',
    'ترك عند الاستقبال',
    'تسليم للعميل فقط',
    'شقة 304',
    'فيلا 45، البوابة الزرقاء',
    'استخدم المدخل الجانبي',
    'مبنى مكاتب',
    'توصيل مركز تجاري',
    'توصيل مستشفى - المدخل الرئيسي'
  ]
}

// ============== EXPENSE CATEGORIES ==============
export const EXPENSE_CATEGORIES: Record<ExpenseCategory, {
  name: { en: string, ar: string }
  icon: string
  typicalAmount: { min: number, max: number }
}> = {
  fuel: {
    name: { en: 'Fuel', ar: 'وقود' },
    icon: '⛽',
    typicalAmount: { min: 20, max: 60 }
  },
  food: {
    name: { en: 'Food', ar: 'طعام' },
    icon: '🍽️',
    typicalAmount: { min: 15, max: 40 }
  },
  maintenance: {
    name: { en: 'Maintenance', ar: 'صيانة' },
    icon: '🔧',
    typicalAmount: { min: 50, max: 200 }
  },
  toll: {
    name: { en: 'Toll', ar: 'رسوم' },
    icon: '🛣️',
    typicalAmount: { min: 4, max: 20 }
  },
  other: {
    name: { en: 'Other', ar: 'أخرى' },
    icon: '📝',
    typicalAmount: { min: 5, max: 100 }
  }
}

// ============== SAMPLE DELIVERIES ==============
export const SAMPLE_DELIVERIES = [
  {
    id: 1,
    customer: 'Ahmed Al-Mansoori',
    platform: 'talabat' as Platform,
    fee: 15,
    area: 'Dubai Marina',
    notes: 'Gate code 1234, call on arrival',
    time: '18:30',
    date: 'Today',
    status: 'completed' as DeliveryStatus
  },
  {
    id: 2,
    customer: 'Fatima Al-Zahrani',
    platform: 'jahez' as Platform,
    fee: 22,
    area: 'Riyadh KAFD',
    notes: 'Building 5, 3rd floor',
    time: '16:45',
    date: 'Today',
    status: 'completed' as DeliveryStatus
  },
  {
    id: 3,
    customer: 'Khalid Al-Qasimi',
    platform: 'careem' as Platform,
    fee: 18,
    area: 'Abu Dhabi',
    notes: 'No elevator, please call',
    time: '14:20',
    date: 'Today',
    status: 'completed' as DeliveryStatus
  },
  {
    id: 4,
    customer: 'Mariam Al-Kuwari',
    platform: 'noon' as Platform,
    fee: 25,
    area: 'Doha West Bay',
    notes: 'Security pass required',
    time: '12:15',
    date: 'Today',
    status: 'completed' as DeliveryStatus
  },
  {
    id: 5,
    customer: 'Omar Al-Balushi',
    platform: 'talabat' as Platform,
    fee: 12,
    area: 'Muscat',
    notes: 'Parking available in basement',
    time: '10:30',
    date: 'Yesterday',
    status: 'completed' as DeliveryStatus
  }
]

// ============== SAMPLE TRANSACTIONS ==============
export const SAMPLE_TRANSACTIONS = [
  {
    id: 1,
    type: 'income' as TransactionType,
    amount: 150,
    category: 'delivery' as any,
    description: 'Talabat deliveries - 10 orders',
    time: '18:30',
    date: 'Today'
  },
  {
    id: 2,
    type: 'expense' as TransactionType,
    amount: 45,
    category: 'fuel' as ExpenseCategory,
    description: 'Gas station - Emirates NBD',
    time: '16:00',
    date: 'Today'
  },
  {
    id: 3,
    type: 'income' as TransactionType,
    amount: 85,
    category: 'delivery' as any,
    description: 'Jahez orders - 5 deliveries',
    time: '14:30',
    date: 'Today'
  },
  {
    id: 4,
    type: 'expense' as TransactionType,
    amount: 20,
    category: 'food' as ExpenseCategory,
    description: 'Lunch - Al Baik',
    time: '13:00',
    date: 'Today'
  },
  {
    id: 5,
    type: 'income' as TransactionType,
    amount: 110,
    category: 'delivery' as any,
    description: 'Careem deliveries - Evening shift',
    time: '11:45',
    date: 'Today'
  }
]

// ============== DRIVER STATS ==============
export const DRIVER_STATS = {
  totalDeliveries: 856,
  totalEarnings: 12540, // AED
  averageRating: 4.8,
  hoursWorked: 320,
  favoritePlatform: 'talabat' as Platform,
  topArea: 'Dubai Marina'
}

// ============== HELPER FUNCTIONS ==============
export function getRandomGulfName(gender: 'male' | 'female' = Math.random() > 0.5 ? 'male' : 'female'): string {
  const names = GULF_NAMES[gender]
  return names[Math.floor(Math.random() * names.length)]
}

export function getRandomGulfArea(): string {
  const allAreas = Object.values(GCC_CITIES).flat()
  const area = allAreas[Math.floor(Math.random() * allAreas.length)]
  return `${area.emoji} ${area.name}`
}

export function getRandomPlatform(): Platform {
  const platforms: Platform[] = ['talabat', 'jahez', 'careem', 'noon', 'other']
  return platforms[Math.floor(Math.random() * platforms.length)]
}

export function getRandomDeliveryFee(platform: Platform): number {
  const range = DELIVERY_PLATFORMS[platform].feeRange
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
}

export function getRandomNote(language: 'en' | 'ar' = 'en'): string {
  const notes = DELIVERY_NOTES[language]
  return notes[Math.floor(Math.random() * notes.length)]
}

export function generateRandomDelivery() {
  const platform = getRandomPlatform()
  return {
    id: Date.now(),
    customer: getRandomGulfName(),
    platform,
    fee: getRandomDeliveryFee(platform),
    area: getRandomGulfArea(),
    notes: getRandomNote(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: 'Today',
    status: 'completed' as DeliveryStatus
  }
}

export function generateRandomTransaction(type: TransactionType = 'income') {
  const categories: ExpenseCategory[] = type === 'income' 
    ? ['delivery' as any]
    : ['fuel', 'food', 'maintenance', 'toll', 'other']
  
  const category = categories[Math.floor(Math.random() * categories.length)]
  const categoryInfo = EXPENSE_CATEGORIES[category as ExpenseCategory] || { typicalAmount: { min: 10, max: 50 } }
  
  return {
    id: Date.now(),
    type,
    amount: Math.floor(Math.random() * (categoryInfo.typicalAmount.max - categoryInfo.typicalAmount.min + 1)) + categoryInfo.typicalAmount.min,
    category,
    description: type === 'income' ? `${DELIVERY_PLATFORMS[getRandomPlatform()].name.en} delivery` : `${category} expense`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: 'Today'
  }
}

// ============== WEEKLY EARNINGS ==============
export const WEEKLY_EARNINGS = [
  { day: 'Sun', earnings: 320 },
  { day: 'Mon', earnings: 280 },
  { day: 'Tue', earnings: 350 },
  { day: 'Wed', earnings: 410 },
  { day: 'Thu', earnings: 380 },
  { day: 'Fri', earnings: 290 },
  { day: 'Sat', earnings: 250 }
]

// ============== PLATFORM DISTRIBUTION ==============
export const PLATFORM_DISTRIBUTION = [
  { platform: 'talabat' as Platform, percentage: 45, deliveries: 385 },
  { platform: 'jahez' as Platform, percentage: 25, deliveries: 214 },
  { platform: 'careem' as Platform, percentage: 15, deliveries: 128 },
  { platform: 'noon' as Platform, percentage: 10, deliveries: 86 },
  { platform: 'other' as Platform, percentage: 5, deliveries: 43 }
]

// ============== MONTHLY SUMMARY ==============
export const MONTHLY_SUMMARY = {
  currentMonth: 'December 2024',
  totalEarnings: 5340, // AED
  totalDeliveries: 156,
  averageDailyEarnings: 178, // AED
  bestDay: { date: 'Dec 15', earnings: 425 },
  topPlatform: 'Talabat',
  fuelExpenses: 560 // AED
}

// Export all as default
export default {
  GCC_CITIES,
  DELIVERY_PLATFORMS,
  GULF_NAMES,
  DELIVERY_NOTES,
  EXPENSE_CATEGORIES,
  SAMPLE_DELIVERIES,
  SAMPLE_TRANSACTIONS,
  DRIVER_STATS,
  getRandomGulfName,
  getRandomGulfArea,
  getRandomPlatform,
  getRandomDeliveryFee,
  getRandomNote,
  generateRandomDelivery,
  generateRandomTransaction,
  WEEKLY_EARNINGS,
  PLATFORM_DISTRIBUTION,
  MONTHLY_SUMMARY
}
