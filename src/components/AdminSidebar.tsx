import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, Share2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isMobile?: boolean;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
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

  const isActive = (path: string) => location.pathname === path;

  const handleNav = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <>
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold text-foreground tracking-wider uppercase">EstateCRM</h1>
        <p className="text-sm text-muted-foreground mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Button
              variant="ghost"
              onClick={() => handleNav("/admin")}
              className={cn(
                "w-full justify-start gap-3",
                isActive("/admin")
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              onClick={() => handleNav("/admin/leads")}
              className={cn(
                "w-full justify-start gap-3",
                isActive("/admin/leads")
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Users className="h-4 w-4" />
              Leads
            </Button>
          </li>
        </ul>

        <div className="mt-8 pt-8 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => handleNav("/admin/share")}
            className={cn(
              "w-full justify-start gap-3",
              isActive("/admin/share")
                ? "bg-secondary text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Share2 className="h-4 w-4" />
            Share & Publish
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
    </>
  );
}

export function AdminSidebar({ isMobile = false }: AdminSidebarProps) {
  if (isMobile) {
    return null; // Mobile sidebar handled by MobileHeader
  }

  return (
    <aside className="hidden lg:flex w-64 min-h-screen bg-card border-r border-border flex-col z-50 relative">
      <SidebarContent />
    </aside>
  );
}

export function MobileHeader() {
  return (
    <div className="lg:hidden sticky top-0 z-40 bg-card border-b border-border">
      <div className="flex items-center justify-between p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-card">
            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
            <div className="flex flex-col h-full">
              <SidebarContent onNavigate={() => {
                // Sheet will auto-close due to the click
              }} />
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold text-foreground tracking-wider uppercase">EstateCRM</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
    </div>
  );
}
