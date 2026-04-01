import { useMemo } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";

export interface IMonthlySpending {
  month: string;
  spending: number;
}

export function useSpendingTrend() {
  const transactions = useTransactionStore((state) => state.transactions);

  return useMemo(() => {
    const now = new Date();

    // Build last 6 months as ordered keys
    const months: { key: string; label: string }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("en-GB", {
        month: "short",
        year: "2-digit",
      });
      months.push({ key, label });
    }

    // Sum expenses per month
    const spendingMap: Record<string, number> = {};
    for (const t of transactions) {
      if (t.type !== "expense") continue;

      const key = t.date.slice(0, 7); // "YYYY-MM"
      if (key in spendingMap || months.some((m) => m.key === key)) {
        spendingMap[key] = (spendingMap[key] ?? 0) + t.amount;
      }
    }

    const spendingTrend: IMonthlySpending[] = months.map(({ key, label }) => ({
      month: label,
      spending: spendingMap[key] ?? 0,
    }));

    return {
      spendingTrend,
    };
  }, [transactions]);
}
