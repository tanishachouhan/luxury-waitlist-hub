import { useRef } from "react";
import { Link } from "react-router-dom";
import { Users, BarChart3, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/WaitlistForm";
import { AnimatedSection } from "@/components/AnimatedSection";
import heroImage from "@/assets/hero-architecture.jpg";

const FEATURES = [
  {
    icon: Mail,
    title: "INSTANT ALERTS",
    description: "Get notified the moment a new lead joins your waitlist. Never miss an opportunity.",
  },
  {
    icon: BarChart3,
    title: "LEAD SCORING",
    description: "Automatically prioritize leads based on budget, timing, and engagement level.",
  },
  {
    icon: Users,
    title: "AUTO-EXPORT",
    description: "Seamlessly export your leads to your favorite CRM or email marketing tools.",
  },
];

const Index = () => {
  const formInputRef = useRef<HTMLInputElement>(null);

  const scrollToForm = () => {
    formInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      formInputRef.current?.focus();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Bar - Sticky */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl font-semibold text-foreground tracking-wider uppercase">
            EstateCRM
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="mailto:support@estatecrm.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Support
            </a>
            <Button size="sm" className="font-medium uppercase tracking-wide" onClick={scrollToForm}>
              Get Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Split Layout */}
      <section className="flex-1 relative min-h-[calc(100vh-65px)] overflow-hidden">
        {/* Background Image - absolute cover on mobile/tablet, right half on desktop */}
        <div className="absolute inset-0 lg:left-1/2 lg:right-0">
          <img 
            src={heroImage} 
            alt="Modern architecture" 
            className="w-full h-full object-cover grayscale"
          />
          {/* White overlay with 85% opacity for mobile/tablet readability */}
          <div className="absolute inset-0 bg-white/[0.85] backdrop-blur-md lg:hidden" />
        </div>

        <div className="relative grid lg:grid-cols-2 min-h-[calc(100vh-65px)]">
          {/* Left Column - Text & Form */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-10 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-24 lg:bg-muted/20">
            <AnimatedSection>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#101828] uppercase tracking-tight leading-[0.9] mb-6">
                REAL ESTATE
                <br />
                CRM
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-[2px] h-8 bg-muted-foreground/40" />
                <span className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
                  Lead Management
                </span>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="text-muted-foreground font-light leading-relaxed max-w-md mb-10">
                Stop using messy spreadsheets. Capture, track, and convert leads with our simple CRM built specifically for real estate professionals.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="w-full max-w-md">
                <WaitlistForm ref={formInputRef} />
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column - Empty space for desktop image */}
          <div className="hidden lg:block" />
        </div>
      </section>

      {/* Features Section - Minimal */}
      <section className="py-24 md:py-32 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-20">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#101828] uppercase tracking-tight mb-4">
              EVERYTHING YOU NEED
            </h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto">
              Simple, powerful tools designed specifically for real estate professionals.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {FEATURES.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 150}>
                <div className="text-center">
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-muted-foreground stroke-[1.5]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#101828] uppercase tracking-wide mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-10 border-t border-border bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground font-light">
              © {new Date().getFullYear()} EstateCRM. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                Terms of Service
              </Link>
              <Link
                to="/auth"
                className="text-xs text-gray-400 hover:text-muted-foreground transition-colors"
              >
                Staff Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
