import { ReactNode } from "react";

interface BrowserMockupProps {
  children: ReactNode;
}

export function BrowserMockup({ children }: BrowserMockupProps) {
  return (
    <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
      {/* Window Header */}
      <div className="h-10 bg-muted/80 flex items-center px-4 gap-2 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-warning/80" />
          <div className="w-3 h-3 rounded-full bg-success/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-background/50 rounded-md px-4 py-1 text-xs text-muted-foreground">
            estatecrm.com/waitlist
          </div>
        </div>
        <div className="w-14" /> {/* Spacer to center the URL */}
      </div>
      
      {/* Window Content */}
      <div className="bg-card p-8 max-h-[600px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}