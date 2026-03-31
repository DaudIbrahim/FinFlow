export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category:
    | 'Food'
    | 'Transport'
    | 'Utilities'
    | 'Entertainment'
    | 'Health'
    | 'Shopping'
    | 'Income'
    | 'Other'
  date: string
  status: 'completed' | 'pending' | 'failed'
}
