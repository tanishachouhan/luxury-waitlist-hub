import { Link } from "react-router-dom";
import { Users, BarChart3, Mail, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/WaitlistForm";

const FEATURES = [
  {
    icon: Mail,
    title: "Instant Alerts",
    description: "Get notified the moment a new lead joins your waitlist. Never miss an opportunity.",
  },
  {
    icon: BarChart3,
    title: "Lead Scoring",
    description: "Automatically prioritize leads based on budget, timing, and engagement level.",
  },
  {
    icon: Users,
    title: "Auto-Export",
    description: "Seamlessly export your leads to your favorite CRM or email marketing tools.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Bar - Sticky */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-foreground tracking-tight">
            EstateCRM
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/auth"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Support
            </Link>
            <Button size="sm" className="font-medium">
              Get Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
              The Smartest Way to Manage Real Estate Leads.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop using messy spreadsheets. Capture, track, and convert leads with our simple CRM.
            </p>
          </div>
          
          <Card className="max-w-xl mx-auto shadow-lg border-border">
            <CardContent className="p-6 md:p-8">
              <WaitlistForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by agents at:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Douglas Elliman", "Compass", "Sotheby's", "Corcoran", "Brown Harris"].map((name) => (
              <div
                key={name}
                className="text-lg md:text-xl font-semibold text-muted-foreground/50"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to close more deals
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, powerful tools designed specifically for real estate professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="border-border bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EstateCRM. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
