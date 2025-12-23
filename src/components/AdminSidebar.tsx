import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function AdminSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  }

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold text-foreground tracking-wider uppercase">EstateCRM</h1>
        <p className="text-sm text-muted-foreground mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-foreground"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </li>
          <li>
            <Button
              variant="secondary"
              className="w-full justify-start gap-3"
            >
              <Users className="h-4 w-4" />
              Leads
            </Button>
          </li>
        </ul>

        <div className="mt-8 pt-8 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground"
            onClick={() => window.open("/", "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
            View Form
          </Button>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
