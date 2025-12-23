import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface NeighborhoodPillsProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export function NeighborhoodPills({ 
  options, 
  selected, 
  onChange,
  otherValue = "",
  onOtherChange
}: NeighborhoodPillsProps) {
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  // Sync isOtherSelected with external state
  useEffect(() => {
    setIsOtherSelected(selected.includes("__other__"));
  }, [selected]);

  const toggleNeighborhood = (neighborhood: string) => {
    if (selected.includes(neighborhood)) {
      onChange(selected.filter((n) => n !== neighborhood));
    } else {
      onChange([...selected, neighborhood]);
    }
  };

  const toggleOther = () => {
    if (isOtherSelected) {
      onChange(selected.filter((n) => n !== "__other__"));
      onOtherChange?.("");
    } else {
      onChange([...selected, "__other__"]);
    }
  };

  return (
    <div className="space-y-3">
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
        {/* Other option */}
        <button
          type="button"
          onClick={toggleOther}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
            "border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            isOtherSelected
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-foreground border-border hover:border-primary/50"
          )}
        >
          Other
        </button>
      </div>

      {/* Conditional input for Other */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isOtherSelected ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Input
          type="text"
          placeholder="Please specify other location..."
          value={otherValue}
          onChange={(e) => onOtherChange?.(e.target.value)}
          className="mt-2"
          maxLength={100}
        />
      </div>
    </div>
  );
}
