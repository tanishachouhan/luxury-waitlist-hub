import { cn } from "@/lib/utils";

type Status = "new" | "contacted" | "archived";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  new: {
    label: "New",
    className: "bg-emerald-50 text-emerald-700",
  },
  contacted: {
    label: "Contacted",
    className: "bg-blue-50 text-blue-700",
  },
  archived: {
    label: "Archived",
    className: "bg-gray-100 text-gray-600",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
