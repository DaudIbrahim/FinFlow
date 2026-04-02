import AddTransactionModal from "@/components/AddTransaction/AddTransactionModal";
import SpendingTrendChart from "@/components/Charts/SpendingTrendChart";
import { Wallet } from "lucide-react";
import TransactionList from "@/components/Transactions/TransactionList";
import SummaryCards from "@/components/SummaryCards/SummaryCards";
import CategoryBreakdownChart from "@/components/Charts/CategoryBreakdownChart";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-500" />
            <h1 className="text-lg font-semibold text-slate-800">FinFlow</h1>
          </div>
          <AddTransactionModal />
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <SpendingTrendChart />
          <CategoryBreakdownChart />
        </div>

        {/* Transaction List */}
        <TransactionList />
      </div>
    </div>
  );
};

export default Dashboard;
