import { Users, Inbox, MapPin, TrendingUp, TrendingDown } from "lucide-react";
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
      label: "TOTAL LEADS",
      value: totalLeads,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+12%",
      trendUp: true,
      trendLabel: "vs last week",
    },
    {
      label: "NEW INQUIRIES",
      value: newInquiries,
      icon: Inbox,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      trend: "+8%",
      trendUp: true,
      trendLabel: "vs last week",
    },
    {
      label: "TOP LOCATION",
      value: topNeighborhood,
      icon: MapPin,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      trend: null,
      trendUp: null,
      trendLabel: "most selected",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
      {stats.map((stat) => (
        <Card 
          key={stat.label} 
          className="bg-card border-0 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-foreground tracking-tight">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1.5">
                  {stat.trend ? (
                    <>
                      {stat.trendUp ? (
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                      )}
                      <span className={`text-xs font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stat.trend}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {stat.trendLabel}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {stat.trendLabel}
                    </span>
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
