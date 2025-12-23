import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  fullName: string;
  email: string;
  phone: string;
  budgetRange: string;
  moveInDate: string;
  neighborhoods: string[];
}

// HTML entity escaping to prevent XSS in email templates
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, phone, budgetRange, moveInDate, neighborhoods }: LeadNotificationRequest = await req.json();

    console.log("Sending notification for new lead:", escapeHtml(fullName));

    // Sanitize all user inputs before inserting into HTML
    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeBudgetRange = escapeHtml(budgetRange);
    const safeMoveInDate = escapeHtml(moveInDate);
    const safeNeighborhoods = neighborhoods.map(n => escapeHtml(n)).join(", ");

    // Send notification email to admin using Resend API directly
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Prestige Residences <onboarding@resend.dev>",
        to: ["delivered@resend.dev"], // Replace with your admin email after domain verification
        subject: `New Waitlist Lead: ${safeFullName}`,
        html: `
          <h1>New Waitlist Submission</h1>
          <p>A new lead has joined the Priority Access Waitlist.</p>
          
          <h2>Lead Details</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safeFullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Budget</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safeBudgetRange}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Move-in Date</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safeMoveInDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Neighborhoods</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${safeNeighborhoods}</td>
            </tr>
          </table>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      // Don't expose internal API error details to client
      throw new Error("Failed to send notification email");
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-lead-notification function:", error);
    // Return generic error message to client
    return new Response(
      JSON.stringify({ error: "Unable to send notification. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
