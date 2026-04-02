import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart as PieIcon } from "lucide-react";
import { useTransactionSummary } from "@/hooks/useTransactionSummary";
import { TRANSACTION_CATEGORIES } from "@/constants";
import type { TransactionCategory } from "@/types";
import { formatBDT } from "@/utils";

// Every category is explicitly typed
const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  Food: "#f97316",
  Transport: "#3b82f6",
  Utilities: "#8b5cf6",
  Entertainment: "#ec4899",
  Health: "#10b981",
  Shopping: "#f59e0b",
  Income: "#22c55e",
  Other: "#94a3b8",
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: TransactionCategory; value: number }[];
}) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white border border-slate-100 rounded-lg shadow-md px-3 py-2">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: CATEGORY_COLORS[name] }}
        />
        <p className="text-xs text-slate-500">{name}</p>
      </div>
      <p className="text-sm font-semibold text-slate-800">{formatBDT(value)}</p>
    </div>
  );
};

const CategoryBreakdownChart = () => {
  const { categoryBreakdown } = useTransactionSummary();

  // Iterate constants instead of Object.entries(categoryBreakdown)
  // so chart order is always predictable and new categories are picked up automatically
  const data = TRANSACTION_CATEGORIES.filter(
    (cat) => (categoryBreakdown[cat] ?? 0) > 0,
  ).map((cat) => ({
    name: cat,
    value: categoryBreakdown[cat],
  }));

  if (data.length === 0) return null;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <PieIcon className="w-5 h-5 text-slate-500" />
          <CardTitle className="text-lg font-semibold text-slate-800">
            Spending by Category
          </CardTitle>
        </div>
        <p className="text-xs text-slate-400">Breakdown of all expenses</p>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map(({ name }) => (
                <Cell key={name} fill={CATEGORY_COLORS[name]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value: TransactionCategory) => (
                <span className="text-xs text-slate-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdownChart;
