import type { Transaction } from "@/types";
import StatusBadge from "./StatusBadge";

interface TransactionRowProps {
  transaction: Transaction;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const TransactionRow = ({ transaction }: TransactionRowProps) => {
  const { description, category, amount, type, date, status } = transaction;

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
      {/* Left — description + category */}
      <div className="flex flex-col gap-0.5 w-[35%]">
        <span className="text-sm font-medium text-slate-800 truncate">
          {description}
        </span>
        <span className="text-xs text-slate-400">{category}</span>
      </div>

      {/* Center — date */}
      <div className="w-[25%] hidden sm:block">
        <span className="text-sm text-slate-500">{formatDate(date)}</span>
      </div>

      {/* Center — status */}
      <div className="w-[20%] hidden sm:flex">
        <StatusBadge status={status} />
      </div>

      {/* Right — amount */}
      <div className="flex flex-col items-end gap-0.5">
        <span
          className={`text-sm font-semibold ${
            type === "income" ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {type === "income" ? "+" : "-"}
          {formatCurrency(amount)}
        </span>
        {/* Mobile — show date + status inline */}
        <span className="text-xs text-slate-400 sm:hidden">
          {formatDate(date)}
        </span>
        <div className="sm:hidden">
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;
