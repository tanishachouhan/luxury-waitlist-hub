import { useLocation } from "react-router-dom";
import { AdminSidebar, MobileHeader } from "@/components/AdminSidebar";
import { LeadsTable } from "@/components/LeadsTable";
import { useRequireAdmin } from "@/hooks/useRequireAdmin";

export default function Admin() {
  const { isAdmin, loading } = useRequireAdmin();
  const location = useLocation();

  const isDashboard = location.pathname === "/admin";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col lg:flex-row">
      <MobileHeader />
      <AdminSidebar />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
            {isDashboard ? "Dashboard Overview" : "All Leads"}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            {isDashboard 
              ? "Welcome back to your command center." 
              : "Manage and track your full waitlist."}
          </p>
        </div>

        {isDashboard ? (
          <LeadsTable 
            showStats={true} 
            showFilters={false} 
            showChart={true}
            limit={5} 
            tableTitle="Recent Submissions"
          />
        ) : (
          <LeadsTable 
            showStats={false} 
            showFilters={true}
            showChart={false}
          />
        )}
      </main>
    </div>
  );
}
