
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase server configuration.");
      return jsonResponse(
        { error: "Server configuration error." },
        500
      );
    }

    const body = await req.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const phone =
      typeof body.phone === "string" ? body.phone.trim() : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !phone || !email || !message) {
      return jsonResponse(
        { error: "Please complete all required fields." },
        400
      );
    }

    if (
      name.length > 120 ||
      phone.length > 40 ||
      email.length > 254 ||
      message.length > 5000
    ) {
      return jsonResponse(
        { error: "One or more fields exceed the allowed length." },
        400
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return jsonResponse(
        { error: "Please enter a valid email address." },
        400
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { data: enquiry, error: insertError } = await supabase
      .from("enquiries")
      .insert({
        name,
        phone,
        email,
        message,
        source: "proposal",
        status: "new",
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Enquiry database error:", insertError);
      return jsonResponse(
        { error: "Unable to save your enquiry. Please try again." },
        500
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("SHOREBLAST_FROM_EMAIL");
    const notificationEmail =
      Deno.env.get("NOTIFICATION_EMAIL") ||
      "info@shoreblastenergy.com";

    let notificationSent = false;

    if (resendApiKey && fromEmail) {
      try {
        const emailResponse = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fromEmail,
              to: [notificationEmail],
              reply_to: email,
              subject: `New Proposal Enquiry from ${name}`,
              html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#10283f;">
                  <h2 style="color:#10283f;">New Website Enquiry</h2>
                  <p>A new proposal enquiry has been submitted through the Shore Blast website.</p>
                  <hr />
                  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                  <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
                  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                  <p><strong>Message:</strong></p>
                  <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
                  <hr />
                  <p style="font-size:12px;color:#777;">
                    Enquiry ID: ${escapeHtml(enquiry.id)}
                  </p>
                </div>
              `,
            }),
          }
        );

        if (!emailResponse.ok) {
          console.error(
            "Resend notification error:",
            await emailResponse.text()
          );
        } else {
          notificationSent = true;
        }
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }
    } else {
      console.error("Resend configuration is missing.");
    }

    return jsonResponse({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      enquiryId: enquiry.id,
      notificationSent,
    });
  } catch (error) {
    console.error("Submit enquiry error:", error);

    return jsonResponse(
      { error: "An unexpected error occurred. Please try again." },
      500
    );
  }
});
