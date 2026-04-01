import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions";
import TransactionFilters from "@/components/Transactions/TransactionFilters";
import TransactionRow from "@/components/Transactions/TransactionRow";
import { ArrowDownUp } from "lucide-react";
import AddTransactionModal from "@/components/AddTransaction/AddTransactionModal";

const TransactionList = () => {
  const {
    filters,
    updateFilter,
    resetFilters,
    visibleTransactions,
    totalCount,
    visibleCount,
    hasMore,
    loadMore,
  } = useFilteredTransactions();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowDownUp className="w-5 h-5 text-slate-500" />
              <CardTitle className="text-lg font-semibold text-slate-800">
                Transactions
              </CardTitle>
            </div>
            <AddTransactionModal />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {/* Filters */}
          <TransactionFilters
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            totalCount={totalCount}
            visibleCount={visibleCount}
          />

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Column headers */}
          <div className="flex items-center px-4 text-xs font-medium text-slate-400 uppercase tracking-wide">
            <span className="w-[35%]">Description</span>
            <span className="w-[25%] hidden sm:block">Date</span>
            <span className="w-[20%] hidden sm:block">Status</span>
            <span className="ml-auto">Amount</span>
          </div>

          {/* Transaction rows */}
          {visibleTransactions.length > 0 ? (
            <div className="flex flex-col gap-1">
              {visibleTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <ArrowDownUp className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm font-medium">No transactions found</p>
              <p className="text-xs mt-1">Try adjusting your filters</p>
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadMore}
                className="w-full max-w-xs text-slate-600"
              >
                Load more
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionList;
