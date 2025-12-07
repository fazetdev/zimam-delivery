'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { formatDateForStorage } from '@/lib/formatters'

export type TransactionType = 'income' | 'expense'
export type ExpenseCategory = 'fuel' | 'food' | 'maintenance' | 'toll' | 'other'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  category: ExpenseCategory | 'delivery'
  description: string
  time: string
  date: string // Format: YYYY-MM-DD
}

interface WalletState {
  // State
  transactions: Transaction[]
  isLoading: boolean
  
  // Computed values
  getTodayTransactions: () => Transaction[]
  getTodayIncome: () => number
  getTodayExpense: () => number
  getTodayProfit: () => number
  getWeeklySummary: () => { date: string; income: number; expense: number; profit: number }[]
  getMonthlySummary: (month?: number, year?: number) => { income: number; expense: number; profit: number }
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'time' | 'date'>) => void
  deleteTransaction: (id: string) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  clearAllTransactions: () => void
  importTransactions: (newTransactions: Transaction[]) => void
}

// Helper function to get current time in HH:MM format
const getCurrentTime = () => {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

export const useWallet = create<WalletState>()(
  persist(
    (set, get) => ({
      // Initial state with sample data
      transactions: [
        {
          id: '1',
          type: 'income',
          amount: 150,
          category: 'delivery',
          description: 'Talabat deliveries - 10 orders',
          time: '18:30',
          date: formatDateForStorage(new Date())
        },
        {
          id: '2',
          type: 'expense',
          amount: 45,
          category: 'fuel',
          description: 'Gas station - Emirates NBD',
          time: '16:00',
          date: formatDateForStorage(new Date())
        },
        {
          id: '3',
          type: 'income',
          amount: 85,
          category: 'delivery',
          description: 'Jahez orders - 5 deliveries',
          time: '14:30',
          date: formatDateForStorage(new Date())
        },
        {
          id: '4',
          type: 'expense',
          amount: 20,
          category: 'food',
          description: 'Lunch - Al Baik',
          time: '13:00',
          date: formatDateForStorage(new Date())
        },
        {
          id: '5',
          type: 'income',
          amount: 110,
          category: 'delivery',
          description: 'Careem deliveries - Evening shift',
          time: '11:45',
          date: formatDateForStorage(new Date())
        }
      ],
      isLoading: false,
      
      // Computed values
      getTodayTransactions: () => {
        const today = formatDateForStorage(new Date())
        return get().transactions.filter(t => t.date === today)
      },
      
      getTodayIncome: () => {
        const today = formatDateForStorage(new Date())
        return get().transactions
          .filter(t => t.date === today && t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0)
      },
      
      getTodayExpense: () => {
        const today = formatDateForStorage(new Date())
        return get().transactions
          .filter(t => t.date === today && t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0)
      },
      
      getTodayProfit: () => {
        return get().getTodayIncome() - get().getTodayExpense()
      },
      
      getWeeklySummary: () => {
        const transactions = get().transactions
        const today = new Date()
        const result = []
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(today.getDate() - i)
          const dateStr = formatDateForStorage(date)
          
          const dayTransactions = transactions.filter(t => t.date === dateStr)
          const income = dayTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
          const expense = dayTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
          
          result.push({
            date: dateStr,
            income,
            expense,
            profit: income - expense
          })
        }
        
        return result
      },
      
      getMonthlySummary: (month, year) => {
        const now = new Date()
        const targetMonth = month ?? now.getMonth()
        const targetYear = year ?? now.getFullYear()
        
        const monthlyTransactions = get().transactions.filter(t => {
          const [transactionYear, transactionMonth] = t.date.split('-').map(Number)
          return transactionYear === targetYear && transactionMonth === targetMonth + 1
        })
        
        const income = monthlyTransactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0)
        
        const expense = monthlyTransactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0)
        
        return {
          income,
          expense,
          profit: income - expense
        }
      },
      
      // Actions
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: Date.now().toString(),
          time: getCurrentTime(),
          date: formatDateForStorage(new Date()),
        }
        
        set((state) => ({
          transactions: [newTransaction, ...state.transactions]
        }))
      },
      
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter(t => t.id !== id)
        }))
      },
      
      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map(t => 
            t.id === id ? { ...t, ...updates } : t
          )
        }))
      },
      
      clearAllTransactions: () => {
        set({ transactions: [] })
      },
      
      importTransactions: (newTransactions) => {
        set((state) => ({
          transactions: [...newTransactions, ...state.transactions]
        }))
      }
    }),
    {
      name: 'zimam-wallet-storage',
      skipHydration: false,
    }
  )
)

// Helper hook for common wallet operations
export const useWalletSummary = () => {
  const wallet = useWallet()
  
  return {
    todayIncome: wallet.getTodayIncome(),
    todayExpense: wallet.getTodayExpense(),
    todayProfit: wallet.getTodayProfit(),
    todayTransactions: wallet.getTodayTransactions(),
    weeklySummary: wallet.getWeeklySummary(),
    monthlySummary: wallet.getMonthlySummary(),
    totalTransactions: wallet.transactions.length,
    totalIncome: wallet.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpense: wallet.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
    netBalance: wallet.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0) - 
      wallet.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  }
}
