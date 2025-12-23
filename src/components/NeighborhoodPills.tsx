import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface NeighborhoodPillsProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

// Extended list of NYC neighborhoods for autocomplete
const ALL_NEIGHBORHOODS = [
  "Astoria",
  "Battery Park City",
  "Bay Ridge",
  "Bedford-Stuyvesant",
  "Bensonhurst",
  "Boerum Hill",
  "Borough Park",
  "Brighton Beach",
  "Bronx Park",
  "Brooklyn Heights",
  "Bushwick",
  "Carroll Gardens",
  "Chelsea",
  "Chinatown",
  "City Island",
  "Clinton Hill",
  "Cobble Hill",
  "Coney Island",
  "Corona",
  "DUMBO",
  "East Harlem",
  "East Village",
  "Elmhurst",
  "Financial District",
  "Flatbush",
  "Flushing",
  "Forest Hills",
  "Fort Greene",
  "Gramercy Park",
  "Greenpoint",
  "Greenwich Village",
  "Harlem",
  "Hell's Kitchen",
  "Hoboken",
  "Hudson Yards",
  "Inwood",
  "Jackson Heights",
  "Jamaica",
  "Jersey City",
  "Kensington",
  "Kips Bay",
  "Little Italy",
  "Long Island City",
  "Lower East Side",
  "Meatpacking District",
  "Midtown",
  "Morningside Heights",
  "Murray Hill",
  "NoHo",
  "Nolita",
  "Park Slope",
  "Prospect Heights",
  "Queens",
  "Red Hook",
  "Riverdale",
  "Roosevelt Island",
  "SoHo",
  "South Bronx",
  "Staten Island",
  "Stuyvesant Town",
  "Sunnyside",
  "Sunset Park",
  "Tribeca",
  "Union Square",
  "Upper East Side",
  "Upper West Side",
  "Washington Heights",
  "West Village",
  "Williamsburg",
  "Woodside",
];

export function NeighborhoodPills({ 
  options, 
  selected, 
  onChange,
  otherValue = "",
  onOtherChange
}: NeighborhoodPillsProps) {
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Sync isOtherSelected with external state
  useEffect(() => {
    setIsOtherSelected(selected.includes("__other__"));
  }, [selected]);

  // Filter suggestions based on input
  useEffect(() => {
    if (otherValue.trim().length > 0) {
      const filtered = ALL_NEIGHBORHOODS.filter(
        (n) =>
          n.toLowerCase().includes(otherValue.toLowerCase()) &&
          !options.includes(n) &&
          !selected.includes(n)
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [otherValue, options, selected]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      // Focus the input after a short delay
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    onOtherChange?.(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
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

      {/* Conditional input for Other with autocomplete */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isOtherSelected ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="relative mt-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Please specify other location..."
            value={otherValue}
            onChange={(e) => onOtherChange?.(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            maxLength={100}
            autoComplete="off"
          />
          
          {/* Suggestions dropdown */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    highlightedIndex === index && "bg-accent text-accent-foreground"
                  )}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
