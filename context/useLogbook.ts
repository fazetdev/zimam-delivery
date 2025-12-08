'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Platform = 'talabat' | 'jahez' | 'careem' | 'noon' | 'other'
export type FilterPlatform = Platform | 'all'  // <-- allow 'all' for filtering
export type DeliveryStatus = 'completed' | 'in_progress' | 'cancelled'

export interface Delivery {
  id: string
  customer: string
  platform: Platform
  fee: number
  area: string
  notes: string
  time: string
  date: string // Format: YYYY-MM-DD
  status: DeliveryStatus
}

interface LogbookState {
  deliveries: Delivery[]
  isLoading: boolean
  getTodayDeliveries: () => Delivery[]
  getTotalEarnings: () => number
  getTodayEarnings: () => number
  getPlatformStats: () => Record<Platform, { count: number; earnings: number }>
  getAreaStats: () => Record<string, { count: number; earnings: number }>
  searchDeliveries: (query: string, platform?: FilterPlatform, date?: string) => Delivery[]
  addDelivery: (delivery: Omit<Delivery, 'id' | 'time' | 'date' | 'status'>) => void
  deleteDelivery: (id: string) => void
  updateDelivery: (id: string, updates: Partial<Delivery>) => void
  clearAllDeliveries: () => void
  importDeliveries: (newDeliveries: Delivery[]) => void
}

const getTodayDate = () => new Date().toISOString().split('T')[0]
const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const useLogbook = create<LogbookState>()(
  persist(
    (set, get) => ({
      deliveries: [],
      isLoading: false,

      getTodayDeliveries: () => {
        const today = getTodayDate()
        return get().deliveries.filter(d => d.date === today && d.status === 'completed')
      },

      getTotalEarnings: () => get().deliveries.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.fee, 0),

      getTodayEarnings: () => {
        const today = getTodayDate()
        return get().deliveries.filter(d => d.date === today && d.status === 'completed').reduce((sum, d) => sum + d.fee, 0)
      },

      getPlatformStats: () => {
        const stats: Record<Platform, { count: number; earnings: number }> = {
          talabat: { count: 0, earnings: 0 },
          jahez: { count: 0, earnings: 0 },
          careem: { count: 0, earnings: 0 },
          noon: { count: 0, earnings: 0 },
          other: { count: 0, earnings: 0 }
        }
        get().deliveries.filter(d => d.status === 'completed').forEach(d => {
          stats[d.platform].count += 1
          stats[d.platform].earnings += d.fee
        })
        return stats
      },

      getAreaStats: () => {
        const stats: Record<string, { count: number; earnings: number }> = {}
        get().deliveries.filter(d => d.status === 'completed').forEach(d => {
          if (!stats[d.area]) stats[d.area] = { count: 0, earnings: 0 }
          stats[d.area].count += 1
          stats[d.area].earnings += d.fee
        })
        return stats
      },

      searchDeliveries: (query, platform, date) => {
        let results = get().deliveries
        if (query) {
          const q = query.toLowerCase()
          results = results.filter(d => d.customer.toLowerCase().includes(q) || d.area.toLowerCase().includes(q) || d.notes.toLowerCase().includes(q))
        }
        if (platform && platform !== 'all') {
          results = results.filter(d => d.platform === platform)
        }
        if (date) {
          results = results.filter(d => d.date === date)
        }
        return results.sort((a, b) => new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime())
      },

      addDelivery: (delivery) => {
        const newDelivery: Delivery = { ...delivery, id: Date.now().toString(), time: getCurrentTime(), date: getTodayDate(), status: 'completed' }
        set(state => ({ deliveries: [newDelivery, ...state.deliveries] }))
      },

      deleteDelivery: (id) => set(state => ({ deliveries: state.deliveries.filter(d => d.id !== id) })),

      updateDelivery: (id, updates) => set(state => ({ deliveries: state.deliveries.map(d => d.id === id ? { ...d, ...updates } : d) })),

      clearAllDeliveries: () => set({ deliveries: [] }),

      importDeliveries: (newDeliveries) => set(state => ({ deliveries: [...newDeliveries, ...state.deliveries] }))
    }),
    { name: 'zimam-logbook-storage', skipHydration: false }
  )
)

export const useLogbookSummary = () => {
  const logbook = useLogbook()
  return {
    todayDeliveries: logbook.getTodayDeliveries(),
    todayEarnings: logbook.getTodayEarnings(),
    totalEarnings: logbook.getTotalEarnings(),
    totalDeliveries: logbook.deliveries.filter(d => d.status === 'completed').length,
    platformStats: logbook.getPlatformStats(),
    areaStats: logbook.getAreaStats(),
    formattedDeliveries: logbook.deliveries.map(d => ({ ...d, formattedDate: formatDate(d.date) }))
  }
}
