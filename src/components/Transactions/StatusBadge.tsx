import { Badge } from "@/components/ui/badge";
import type { TransactionStatus } from "@/types";

interface StatusBadgeProps {
  status: TransactionStatus;
}

const statusConfig: Record<
  TransactionStatus,
  { label: string; className: string }
> = {
  completed: {
    label: "Completed",
    className:
      "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
  },
  pending: {
    label: "Pending",
    className:
      "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200",
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium ${config.className}`}
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
