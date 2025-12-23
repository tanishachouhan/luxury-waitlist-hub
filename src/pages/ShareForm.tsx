import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/AdminSidebar";
import { BrowserMockup } from "@/components/BrowserMockup";
import { SharePanel } from "@/components/SharePanel";
import { WaitlistForm } from "@/components/WaitlistForm";
import type { User } from "@supabase/supabase-js";

export default function ShareForm() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="min-h-screen flex">
      <AdminSidebar />
      
      {/* Main content with dot pattern background */}
      <main 
        className="flex-1 p-8"
        style={{
          backgroundColor: 'hsl(var(--muted) / 0.3)',
          backgroundImage: `radial-gradient(hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Share & Publish
          </h1>
          <p className="text-muted-foreground mt-1">
            Preview your waitlist form and share it with the world.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Browser Mockup */}
          <BrowserMockup>
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Join Our Waitlist
                </h2>
                <p className="text-muted-foreground">
                  Get early access to exclusive properties
                </p>
              </div>
              <WaitlistForm />
            </div>
          </BrowserMockup>

          {/* Share Panel */}
          <SharePanel />
        </div>
      </main>
    </div>
  );
}