import type {
  TransactionCategory,
  TransactionStatus,
  TransactionType,
} from "@/types";

export const TRANSACTION_TYPES: TransactionType[] = ["income", "expense"];

export const TRANSACTION_CATEGORIES: TransactionCategory[] = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Shopping",
  "Income",
  "Other",
];

export const TRANSACTION_STATUSES: TransactionStatus[] = [
  "completed",
  "pending",
  "failed",
];
