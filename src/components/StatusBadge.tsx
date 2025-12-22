import { cn } from "@/lib/utils";

type Status = "new" | "contacted" | "archived";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  new: {
    label: "New",
    className: "bg-success/10 text-success border-success/20",
  },
  contacted: {
    label: "Contacted",
    className: "bg-muted/30 text-muted-foreground border-muted/40",
  },
  archived: {
    label: "Archived",
    className: "bg-muted/30 text-muted-foreground border-muted/40",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
