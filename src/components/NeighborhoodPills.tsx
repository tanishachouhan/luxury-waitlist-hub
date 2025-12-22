import { cn } from "@/lib/utils";

interface NeighborhoodPillsProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function NeighborhoodPills({ options, selected, onChange }: NeighborhoodPillsProps) {
  const toggleNeighborhood = (neighborhood: string) => {
    if (selected.includes(neighborhood)) {
      onChange(selected.filter((n) => n !== neighborhood));
    } else {
      onChange([...selected, neighborhood]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((neighborhood) => {
        const isSelected = selected.includes(neighborhood);
        return (
          <button
            key={neighborhood}
            type="button"
            onClick={() => toggleNeighborhood(neighborhood)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              "border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              isSelected
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary/50"
            )}
          >
            {neighborhood}
          </button>
        );
      })}
    </div>
  );
}
