// Gulf-specific formatters for Zimam Delivery App

// ============== DATE & TIME FORMATTERS ==============

/**
 * Format date for display based on language
 */
export function formatDate(date: Date | string, language: 'en' | 'ar' = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (language === 'ar') {
    // Arabic date format: يوم، تاريخ شهر سنة
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return dateObj.toLocaleDateString('ar-SA', options)
  }
  
  // English format: Day, Month Date, Year
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return dateObj.toLocaleDateString('en-US', options)
}

/**
 * Format time for display (Gulf prefers 24-hour format)
 */
export function formatTime(date: Date | string, language: 'en' | 'ar' = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (language === 'ar') {
    // Arabic uses 24-hour format
    return dateObj.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }
  
  // English can use 12-hour or 24-hour based on preference
  // For Gulf context, we'll use 24-hour format
  return dateObj.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
}

/**
 * Format relative time (Today, Yesterday, etc.)
 */
export function formatRelativeTime(date: Date | string, language: 'en' | 'ar' = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const inputDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())
  
  const diffTime = today.getTime() - inputDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (language === 'ar') {
    if (diffDays === 0) return 'اليوم'
    if (diffDays === 1) return 'أمس'
    if (diffDays === 2) return 'قبل يومين'
    if (diffDays <= 7) return `قبل ${diffDays} أيام`
    return formatDate(dateObj, 'ar')
  }
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays <= 7) return `${diffDays} days ago`
  return formatDate(dateObj, 'en')
}

/**
 * Format date for storage (YYYY-MM-DD)
 */
export function formatDateForStorage(date: Date): string {
  return date.toISOString().split('T')[0]
}

// ============== CURRENCY FORMATTERS ==============

type GulfCurrency = 'AED' | 'SAR' | 'QAR' | 'OMR' | 'BHD' | 'KWD'

interface CurrencyConfig {
  symbol: string
  name: {
    en: string
    ar: string
  }
  decimalDigits: number
}

const CURRENCY_CONFIG: Record<GulfCurrency, CurrencyConfig> = {
  AED: {
    symbol: 'د.إ',
    name: { en: 'UAE Dirham', ar: 'درهم إماراتي' },
    decimalDigits: 2
  },
  SAR: {
    symbol: 'ر.س',
    name: { en: 'Saudi Riyal', ar: 'ريال سعودي' },
    decimalDigits: 2
  },
  QAR: {
    symbol: 'ر.ق',
    name: { en: 'Qatari Riyal', ar: 'ريال قطري' },
    decimalDigits: 2
  },
  OMR: {
    symbol: 'ر.ع.',
    name: { en: 'Omani Rial', ar: 'ريال عماني' },
    decimalDigits: 3
  },
  BHD: {
    symbol: 'د.ب',
    name: { en: 'Bahraini Dinar', ar: 'دينار بحريني' },
    decimalDigits: 3
  },
  KWD: {
    symbol: 'د.ك',
    name: { en: 'Kuwaiti Dinar', ar: 'دينار كويتي' },
    decimalDigits: 3
  }
}

/**
 * Format currency amount with Gulf currency symbol
 */
export function formatCurrency(
  amount: number, 
  currency: GulfCurrency = 'AED',
  language: 'en' | 'ar' = 'en'
): string {
  const config = CURRENCY_CONFIG[currency]
  const formattedAmount = amount.toFixed(config.decimalDigits)
  
  if (language === 'ar') {
    // Arabic: amount then symbol (right to left)
    return `${formattedAmount} ${config.symbol}`
  }
  
  // English: symbol then amount
  return `${config.symbol} ${formattedAmount}`
}

/**
 * Format currency with compact notation (1.5K, 2.3M)
 */
export function formatCompactCurrency(
  amount: number,
  currency: GulfCurrency = 'AED',
  language: 'en' | 'ar' = 'en'
): string {
  const config = CURRENCY_CONFIG[currency]
  
  if (amount >= 1000000) {
    const value = (amount / 1000000).toFixed(1)
    const symbol = language === 'ar' ? config.symbol : ''
    const unit = language === 'ar' ? 'مليون' : 'M'
    return `${symbol}${value}${unit}`
  }
  
  if (amount >= 1000) {
    const value = (amount / 1000).toFixed(1)
    const symbol = language === 'ar' ? config.symbol : ''
    const unit = language === 'ar' ? 'ألف' : 'K'
    return `${symbol}${value}${unit}`
  }
  
  return formatCurrency(amount, currency, language)
}

/**
 * Format percentage change with +/- sign
 */
export function formatPercentageChange(value: number, language: 'en' | 'ar' = 'en'): string {
  const sign = value >= 0 ? '+' : ''
  const formattedValue = `${sign}${value.toFixed(1)}%`
  
  if (language === 'ar') {
    return value >= 0 ? `+${value.toFixed(1)}٪` : `${value.toFixed(1)}٪`
  }
  
  return formattedValue
}

// ============== NUMBER FORMATTERS ==============

/**
 * Format number with Arabic/English digits
 */
export function formatNumber(number: number, language: 'en' | 'ar' = 'en'): string {
  if (language === 'ar') {
    // Convert to Arabic-Indic digits
    return number.toLocaleString('ar-SA')
  }
  
  return number.toLocaleString('en-US')
}

/**
 * Format distance in kilometers
 */
export function formatDistance(km: number, language: 'en' | 'ar' = 'en'): string {
  if (language === 'ar') {
    return km < 1 
      ? `${(km * 1000).toFixed(0)} متر`
      : `${km.toFixed(1)} كم`
  }
  
  return km < 1 
    ? `${(km * 1000).toFixed(0)}m`
    : `${km.toFixed(1)}km`
}

/**
 * Format duration in hours and minutes
 */
export function formatDuration(minutes: number, language: 'en' | 'ar' = 'en'): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (language === 'ar') {
    if (hours > 0 && mins > 0) return `${hours} س ${mins} د`
    if (hours > 0) return `${hours} ساعة`
    return `${mins} دقيقة`
  }
  
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`
  if (hours > 0) return `${hours}h`
  return `${mins}m`
}

// ============== DELIVERY-SPECIFIC FORMATTERS ==============

/**
 * Format delivery fee with platform context
 */
export function formatDeliveryFee(fee: number, platform?: string, language: 'en' | 'ar' = 'en'): string {
  const currency = formatCurrency(fee, 'AED', language)
  
  if (!platform) return currency
  
  const platformText = language === 'ar' 
    ? platform === 'talabat' ? 'طلبات' 
    : platform === 'jahez' ? 'جاهز'
    : platform === 'careem' ? 'كريم'
    : platform === 'noon' ? 'نون'
    : 'توصيل'
    : platform
  
  return `${currency} • ${platformText}`
}

/**
 * Format rating out of 5
 */
export function formatRating(rating: number, language: 'en' | 'ar' = 'en'): string {
  if (language === 'ar') {
    return `${rating.toFixed(1)} من 5`
  }
  
  return `${rating.toFixed(1)}/5`
}

/**
 * Format order count with context
 */
export function formatOrderCount(count: number, language: 'en' | 'ar' = 'en'): string {
  if (language === 'ar') {
    if (count === 1) return 'طلب واحد'
    if (count === 2) return 'طلبين'
    if (count <= 10) return `${count} طلبات`
    return `${count} طلب`
  }
  
  return count === 1 ? '1 order' : `${count} orders`
}

// ============== ADDRESS FORMATTERS ==============

/**
 * Shorten long addresses for display
 */
export function shortenAddress(address: string, maxLength: number = 30): string {
  if (address.length <= maxLength) return address
  
  const parts = address.split(',')
  if (parts.length > 1) {
    // Keep the most specific part (usually first)
    return parts[0].trim() + '...'
  }
  
  return address.substring(0, maxLength - 3) + '...'
}

/**
 * Format area with emoji if available
 */
export function formatArea(area: string): string {
  const areaEmojis: Record<string, string> = {
    'Dubai Marina': '🏙️',
    'Downtown Dubai': '🗼',
    'Jumeirah': '🏖️',
    'Abu Dhabi': '🕌',
    'Riyadh': '🏢',
    'Jeddah': '🌊',
    'Doha': '🌆',
    'Muscat': '🏔️',
    'Manama': '🏙️',
    'Kuwait City': '🏙️'
  }
  
  const emoji = areaEmojis[area] || '📍'
  return `${emoji} ${area}`
}

// ============== EXPORT ALL FORMATTERS ==============

export default {
  // Date & Time
  formatDate,
  formatTime,
  formatRelativeTime,
  formatDateForStorage,
  
  // Currency
  formatCurrency,
  formatCompactCurrency,
  formatPercentageChange,
  
  // Numbers
  formatNumber,
  formatDistance,
  formatDuration,
  
  // Delivery specific
  formatDeliveryFee,
  formatRating,
  formatOrderCount,
  
  // Address
  shortenAddress,
  formatArea
}
