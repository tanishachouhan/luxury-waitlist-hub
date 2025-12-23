import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

        <div className="prose prose-gray max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using EstateCRM, you agree to be bound by these Terms of Service and 
              all applicable laws and regulations. If you do not agree with any of these terms, you 
              are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed">
              Permission is granted to temporarily access the materials on EstateCRM for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer 
              of title, and under this license you may not modify or copy the materials, use the 
              materials for any commercial purpose, or attempt to decompile or reverse engineer any 
              software contained on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              You are responsible for maintaining the confidentiality of your account and password. 
              You agree to accept responsibility for all activities that occur under your account. 
              You must not use our service for any illegal or unauthorized purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to provide uninterrupted access to our services, but we do not guarantee that 
              the service will be available at all times. We reserve the right to modify, suspend, or 
              discontinue the service at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on EstateCRM are provided on an &quot;as is&quot; basis. We make no warranties, 
              expressed or implied, and hereby disclaim and negate all other warranties including, 
              without limitation, implied warranties or conditions of merchantability, fitness for a 
              particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall EstateCRM or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with applicable 
              laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that 
              location.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to revise these terms of service at any time without notice. By 
              using this website, you are agreeing to be bound by the then current version of these 
              terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@estatecrm.com" className="text-primary hover:underline">
                legal@estatecrm.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
