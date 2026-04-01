import AddTransactionModal from "@/components/AddTransaction/AddTransactionModal";
import SpendingTrendChart from "@/components/Charts/SpendingTrendChart";
import { Wallet } from "lucide-react";
import TransactionList from "@/components/Transactions/TransactionList";
import SummaryCards from "@/components/SummaryCards/SummaryCards";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
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

        {/* Spending Trend Chart */}
        <SpendingTrendChart />

        {/* Transaction List — scrollable box */}
        <TransactionList />
      </div>
    </div>
  );
};

export default Dashboard;
