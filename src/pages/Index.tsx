import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WaitlistForm } from "@/components/WaitlistForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-foreground" />
            <span className="font-semibold text-foreground">Prestige Residences</span>
          </div>
          <Link
            to="/auth"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg shadow-lg border-border">
          <CardHeader className="text-center space-y-2 pb-8">
            <CardTitle className="text-2xl font-semibold text-foreground">
              Priority Access Waitlist
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Join the exclusive list for upcoming luxury vacancies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WaitlistForm />
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prestige Residences. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
