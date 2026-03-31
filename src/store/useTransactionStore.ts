import { create } from 'zustand'
import type { Transaction } from '../types'
import { mockTransactions } from '../data/mockTransactions'

interface TransactionState {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: mockTransactions,
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
}))
