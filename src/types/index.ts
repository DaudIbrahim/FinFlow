export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "Food"
  | "Transport"
  | "Utilities"
  | "Entertainment"
  | "Health"
  | "Shopping"
  | "Income"
  | "Other";

export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  status: TransactionStatus;
}
