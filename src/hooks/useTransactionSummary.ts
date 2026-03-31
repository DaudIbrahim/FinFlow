import { useTransactionStore } from "@/store/useTransactionStore";
import type { TransactionCategory } from "@/types";
import { useMemo } from "react";

export function useTransactionSummary() {
  const transactions = useTransactionStore((state) => state.transactions);

  return useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryBreakdown: Partial<Record<TransactionCategory, number>> = {};

    for (const t of transactions) {
      if (t.type === "income") {
        totalIncome += t.amount;
      } else {
        totalExpenses += t.amount;
        categoryBreakdown[t.category] =
          (categoryBreakdown[t.category] ?? 0) + t.amount;
      }
    }

    return {
      totalIncome,
      totalExpenses,
      totalBalance: totalIncome - totalExpenses,
      categoryBreakdown,
    };
  }, [transactions]);
}
