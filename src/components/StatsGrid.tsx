import { Users, Inbox, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

interface StatsGridProps {
  leads: Lead[];
}

export function StatsGrid({ leads }: StatsGridProps) {
  const totalLeads = leads.length;
  const newInquiries = leads.filter((lead) => lead.status === "new").length;

  // Calculate top neighborhood
  const neighborhoodCounts: Record<string, number> = {};
  leads.forEach((lead) => {
    lead.neighborhoods.forEach((neighborhood) => {
      neighborhoodCounts[neighborhood] = (neighborhoodCounts[neighborhood] || 0) + 1;
    });
  });

  const topNeighborhood =
    Object.entries(neighborhoodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads,
      icon: Users,
    },
    {
      label: "New Inquiries",
      value: newInquiries,
      icon: Inbox,
    },
    {
      label: "Top Location",
      value: topNeighborhood,
      icon: MapPin,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-white border border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
