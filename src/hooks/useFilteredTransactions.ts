import { useState, useMemo } from "react";
import { useTransactionStore } from "@/store/useTransactionStore";
import type { TransactionCategory, TransactionStatus } from "@/types";

type SortField = "date" | "amount";
type SortDirection = "asc" | "desc";

export interface FilterState {
  search: string;
  category: TransactionCategory | "All";
  status: TransactionStatus | "All";
  sortField: SortField;
  sortDirection: SortDirection;
}

const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "All",
  status: "All",
  sortField: "date",
  sortDirection: "desc",
};

const PAGE_SIZE = 10;

export function useFilteredTransactions() {
  const transactions = useTransactionStore((state) => state.transactions);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const updateFilter = (partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
    setVisibleCount(PAGE_SIZE);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setVisibleCount(PAGE_SIZE);
  };

  const allFiltered = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.description
          .toLowerCase()
          .includes(filters.search.toLowerCase().trim());
        const matchesCategory =
          filters.category === "All" || t.category === filters.category;
        const matchesStatus =
          filters.status === "All" || t.status === filters.status;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const comparison =
          filters.sortField === "date"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : a.amount - b.amount;
        return filters.sortDirection === "asc" ? comparison : -comparison;
      });
  }, [transactions, filters]);

  const visibleTransactions = allFiltered.slice(0, visibleCount);
  const hasMore = visibleCount < allFiltered.length;

  const loadMore = () => setVisibleCount((prev) => prev + PAGE_SIZE);

  return {
    filters,
    updateFilter,
    resetFilters,
    visibleTransactions,
    totalCount: allFiltered.length,
    visibleCount,
    hasMore,
    loadMore,
  };
}
