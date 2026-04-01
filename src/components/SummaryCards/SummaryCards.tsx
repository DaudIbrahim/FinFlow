import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { formatBDT } from "@/utils";
import { useTransactionSummary } from "@/hooks/useTransactionSummary";

interface SingleSummaryCardProps {
  label: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
  valueClass: string;
}

const SingleSummaryCard: React.FC<SingleSummaryCardProps> = ({
  label,
  value,
  Icon,
  iconClass,
  valueClass,
}) => (
  <Card className="shadow-sm">
    <CardContent className="pt-5 pb-4 px-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-500">{label}</span>
        <span className={`p-2 rounded-lg ${iconClass}`}>
          <Icon className="w-4 h-4" />
        </span>
      </div>
      <p className={`text-2xl font-bold tracking-tight ${valueClass}`}>
        {value}
      </p>
    </CardContent>
  </Card>
);

const SummaryCards: React.FC = () => {
  const { totalBalance, totalIncome, totalExpenses } = useTransactionSummary();

  const cards: SingleSummaryCardProps[] = [
    {
      label: "Total Balance",
      value: formatBDT(totalBalance),
      Icon: Wallet,
      iconClass: "text-slate-500 bg-slate-100",
      valueClass: totalBalance >= 0 ? "text-slate-800" : "text-red-500",
    },
    {
      label: "Total Income",
      value: formatBDT(totalIncome),
      Icon: TrendingUp,
      iconClass: "text-emerald-600 bg-emerald-50",
      valueClass: "text-emerald-600",
    },
    {
      label: "Total Expenses",
      value: formatBDT(totalExpenses),
      Icon: TrendingDown,
      iconClass: "text-red-500 bg-red-50",
      valueClass: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <SingleSummaryCard key={card.label} {...card} />
      ))}
    </div>
  );
};

export default SummaryCards;
