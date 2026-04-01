import { create } from 'zustand'
import type { ITransaction } from '../types'
import { mockTransactions } from '../data/mockTransactions'

interface TransactionState {
  transactions: ITransaction[]
  addTransaction: (transaction: ITransaction) => void
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: mockTransactions,
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
}))
