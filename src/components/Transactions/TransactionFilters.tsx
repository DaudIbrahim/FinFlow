import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, ArrowUpDown } from "lucide-react";
import type { FilterState } from "@/hooks/useFilteredTransactions";
import type { TransactionCategory, TransactionStatus } from "@/types";

const CATEGORIES: (TransactionCategory | "All")[] = [
  "All",
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Shopping",
  "Income",
  "Other",
];

const STATUSES: (TransactionStatus | "All")[] = [
  "All",
  "completed",
  "pending",
  "failed",
];

interface TransactionFiltersProps {
  filters: FilterState;
  updateFilter: (partial: Partial<FilterState>) => void;
  resetFilters: () => void;
  totalCount: number;
  visibleCount: number;
}

const TransactionFilters = ({
  filters,
  updateFilter,
  resetFilters,
  totalCount,
  visibleCount,
}: TransactionFiltersProps) => {
  const isFiltered =
    filters.search !== "" ||
    filters.category !== "All" ||
    filters.status !== "All";

  const toggleSort = (field: FilterState["sortField"]) => {
    if (filters.sortField === field) {
      updateFilter({
        sortDirection: filters.sortDirection === "asc" ? "desc" : "asc",
      });
    } else {
      updateFilter({ sortField: field, sortDirection: "desc" });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => updateFilter({ search: e.target.value })}
          className="pl-9 bg-white"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Category filter */}
        <Select
          value={filters.category}
          onValueChange={(val) =>
            updateFilter({ category: val as TransactionCategory | "All" })
          }
        >
          <SelectTrigger className="w-[150px] bg-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select
          value={filters.status}
          onValueChange={(val) =>
            updateFilter({ status: val as TransactionStatus | "All" })
          }
        >
          <SelectTrigger className="w-[140px] bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort by date */}
        <Button
          variant={filters.sortField === "date" ? "default" : "outline"}
          size="sm"
          onClick={() => toggleSort("date")}
          className="flex items-center gap-1"
        >
          <ArrowUpDown className="w-3 h-3" />
          Date
          {filters.sortField === "date" && (
            <span className="text-xs opacity-70">
              {filters.sortDirection === "asc" ? "↑" : "↓"}
            </span>
          )}
        </Button>

        {/* Sort by amount */}
        <Button
          variant={filters.sortField === "amount" ? "default" : "outline"}
          size="sm"
          onClick={() => toggleSort("amount")}
          className="flex items-center gap-1"
        >
          <ArrowUpDown className="w-3 h-3" />
          Amount
          {filters.sortField === "amount" && (
            <span className="text-xs opacity-70">
              {filters.sortDirection === "asc" ? "↑" : "↓"}
            </span>
          )}
        </Button>

        {/* Reset — only shows when filters are active */}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800"
          >
            <X className="w-3 h-3" />
            Reset
          </Button>
        )}

        {/* Count */}
        <span className="ml-auto text-xs text-slate-400">
          Showing {Math.min(visibleCount, totalCount)} of {totalCount}
        </span>
      </div>
    </div>
  );
};

export default TransactionFilters;
