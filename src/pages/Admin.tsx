import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar, MobileHeader } from "@/components/AdminSidebar";
import { LeadsTable } from "@/components/LeadsTable";
import type { User } from "@supabase/supabase-js";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === "/admin";

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
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
