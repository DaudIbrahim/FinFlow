import { useTransactionSummary } from "@/hooks/useTransactionSummary";

const Dashboard = () => {
  const { totalBalance, totalExpenses } = useTransactionSummary();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-500">
          FinFlow Dashboard placeholder.
        </p>

        <p>
          <strong>Total Balance:</strong> ${totalBalance.toFixed(2)}
        </p>

        <p>
          <strong>Total Expense:</strong> ${totalExpenses.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
