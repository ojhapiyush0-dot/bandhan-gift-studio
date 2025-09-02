import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuthWebhookPayload {
  user: {
    email: string;
    user_metadata?: {
      full_name?: string;
    };
  };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to: string;
    email_action_type: string;
    site_url: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: AuthWebhookPayload = await req.json();
    const { user, email_data } = payload;
    
    // Only handle signup confirmations
    if (email_data.email_action_type !== 'signup') {
      return new Response('Not a signup confirmation', { status: 200 });
    }

    const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'there';

    const emailResponse = await resend.emails.send({
      from: "Bandhan Box <onboarding@resend.dev>",
      to: [user.email],
      subject: "Your 6-digit verification code",
      html: `
        <html>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; margin: 0; padding: 24px; line-height: 1.6;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff;">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #1a1a1a; font-size: 24px; margin: 0; font-weight: 600;">🎁 Bandhan Box</h1>
              </div>
              
              <h2 style="color: #1a1a1a; font-size: 20px; margin: 0 0 16px; font-weight: 600;">Hi ${firstName}!</h2>
              
              <p style="color: #4a5568; margin: 0 0 24px; font-size: 16px;">
                Welcome to Bandhan Box! Use this 6-digit code to verify your email and complete your signup:
              </p>
              
              <div style="background: #f7fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
                <div style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #2d3748; font-family: 'Courier New', monospace;">
                  ${email_data.token}
                </div>
              </div>
              
              <p style="color: #718096; margin: 24px 0 0; font-size: 14px; text-align: center;">
                This code will expire in 10 minutes. If you didn't create an account, you can safely ignore this email.
              </p>
              
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center;">
                <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                  Bandhan Box - Premium Gifting Experience
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("OTP email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending OTP email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);