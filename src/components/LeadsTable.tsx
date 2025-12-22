import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Copy, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { StatusBadge } from "./StatusBadge";
import type { Database } from "@/integrations/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const BUDGET_LABELS: Record<string, string> = {
  "2k-3k": "$2k-$3k",
  "3k-5k": "$3k-$5k",
  "5k+": "$5k+",
};

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [budgetFilter, setBudgetFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("leads-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leads",
        },
        () => {
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading leads",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status updated",
        description: `Lead marked as ${status}`,
      });
      fetchLeads();
    }
  }

  function copyEmail(email: string) {
    navigator.clipboard.writeText(email);
    toast({
      title: "Email copied",
      description: email,
    });
  }

  function exportToCSV() {
    const headers = ["Name", "Email", "Phone", "Budget", "Move-in Date", "Neighborhoods", "Status", "Created At"];
    const csvData = filteredLeads.map((lead) => [
      lead.full_name,
      lead.email,
      lead.phone,
      BUDGET_LABELS[lead.budget_range] || lead.budget_range,
      format(new Date(lead.move_in_date), "yyyy-MM-dd"),
      lead.neighborhoods.join("; "),
      lead.status,
      format(new Date(lead.created_at), "yyyy-MM-dd HH:mm"),
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-export-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export complete",
      description: `${filteredLeads.length} leads exported to CSV`,
    });
  }

  const filteredLeads = leads.filter((lead) => {
    if (budgetFilter === "all") return true;
    return lead.budget_range === budgetFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={budgetFilter} onValueChange={setBudgetFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budgets</SelectItem>
              <SelectItem value="2k-3k">$2k - $3k</SelectItem>
              <SelectItem value="3k-5k">$3k - $5k</SelectItem>
              <SelectItem value="5k+">$5k+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={exportToCSV} disabled={filteredLeads.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Move-in Date</TableHead>
              <TableHead>Neighborhoods</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  No leads yet. Share your waitlist form to start collecting leads.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.full_name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{BUDGET_LABELS[lead.budget_range] || lead.budget_range}</TableCell>
                  <TableCell>{format(new Date(lead.move_in_date), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {lead.neighborhoods.slice(0, 2).map((n) => (
                        <span key={n} className="text-xs bg-secondary px-2 py-0.5 rounded">
                          {n}
                        </span>
                      ))}
                      {lead.neighborhoods.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{lead.neighborhoods.length - 2}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(value) => updateStatus(lead.id, value)}
                    >
                      <SelectTrigger className="w-[120px] h-8 text-xs border-0 bg-transparent p-0">
                        <StatusBadge status={lead.status as "new" | "contacted" | "archived"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyEmail(lead.email)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
