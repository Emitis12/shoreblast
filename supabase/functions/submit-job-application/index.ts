
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

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedCvExtensions = ["pdf", "doc", "docx"];
const allowedCredentialExtensions = ["pdf", "jpg", "jpeg", "png"];

const getExtension = (filename: string) =>
  filename.split(".").pop()?.toLowerCase() || "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  let supabase: ReturnType<typeof createClient> | null = null;
  const uploadedPaths: string[] = [];

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse(
        { error: "Server configuration error." },
        500
      );
    }

    supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const formData = await req.formData();

    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();
    const jobRole = String(formData.get("jobRole") || "").trim();

    const cvFile = formData.get("cv");
    const credentialsFile = formData.get("credentials");

    if (!fullName || !email || !jobRole) {
      return jsonResponse(
        { error: "Please complete all required fields." },
        400
      );
    }

    if (
      fullName.length > 150 ||
      email.length > 254 ||
      jobRole.length > 150
    ) {
      return jsonResponse(
        { error: "One or more fields exceed the allowed length." },
        400
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse(
        { error: "Please enter a valid email address." },
        400
      );
    }

    if (
      !(cvFile instanceof File) ||
      !(credentialsFile instanceof File)
    ) {
      return jsonResponse(
        { error: "Please upload your CV and credentials." },
        400
      );
    }

    if (
      cvFile.size === 0 ||
      credentialsFile.size === 0 ||
      cvFile.size > MAX_FILE_SIZE ||
      credentialsFile.size > MAX_FILE_SIZE
    ) {
      return jsonResponse(
        { error: "Each document must be between 1 byte and 5 MB." },
        400
      );
    }

    const cvExtension = getExtension(cvFile.name);
    const credentialsExtension = getExtension(
      credentialsFile.name
    );

    if (!allowedCvExtensions.includes(cvExtension)) {
      return jsonResponse(
        { error: "CV must be PDF, DOC or DOCX." },
        400
      );
    }

    if (
      !allowedCredentialExtensions.includes(credentialsExtension)
    ) {
      return jsonResponse(
        { error: "Credentials must be PDF, JPG, JPEG or PNG." },
        400
      );
    }

    const bucket = "career-documents";
    const applicationId = crypto.randomUUID();

    const cvPath =
      `${applicationId}/cv-${crypto.randomUUID()}.${cvExtension}`;

    const credentialsPath =
      `${applicationId}/credentials-${crypto.randomUUID()}.${credentialsExtension}`;

    const { error: cvUploadError } = await supabase.storage
      .from(bucket)
      .upload(cvPath, cvFile, {
        contentType: cvFile.type || "application/octet-stream",
        upsert: false,
      });

    if (cvUploadError) {
      console.error("CV upload error:", cvUploadError);
      return jsonResponse(
        { error: "Unable to upload your CV. Please try again." },
        500
      );
    }

    uploadedPaths.push(cvPath);

    const { error: credentialsUploadError } = await supabase.storage
      .from(bucket)
      .upload(credentialsPath, credentialsFile, {
        contentType:
          credentialsFile.type || "application/octet-stream",
        upsert: false,
      });

    if (credentialsUploadError) {
      console.error(
        "Credentials upload error:",
        credentialsUploadError
      );

      await supabase.storage.from(bucket).remove(uploadedPaths);

      return jsonResponse(
        { error: "Unable to upload your credentials. Please try again." },
        500
      );
    }

    uploadedPaths.push(credentialsPath);

    const { data: application, error: insertError } = await supabase
      .from("job_applications")
      .insert({
        full_name: fullName,
        email,
        job_role: jobRole,
        cv_path: cvPath,
        credentials_path: credentialsPath,
        status: "new",
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Application database error:", insertError);

      await supabase.storage.from(bucket).remove(uploadedPaths);

      return jsonResponse(
        { error: "Unable to save your application. Please try again." },
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
              subject: `New Career Application: ${jobRole}`,
              html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#10283f;">
                  <h2>New Career Application</h2>
                  <p>A new application has been submitted through the Shore Blast website.</p>
                  <hr />
                  <p><strong>Applicant:</strong> ${escapeHtml(fullName)}</p>
                  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                  <p><strong>Job Role:</strong> ${escapeHtml(jobRole)}</p>
                  <p><strong>Status:</strong> New</p>
                  <hr />
                  <p style="font-size:12px;color:#777;">
                    Application ID: ${escapeHtml(application.id)}
                  </p>
                  <p style="font-size:12px;color:#777;">
                    Log in to the Shore Blast admin dashboard to review the documents.
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
        console.error("Application email failed:", emailError);
      }
    } else {
      console.error("Resend configuration is missing.");
    }

    return jsonResponse({
      success: true,
      message: "Your application has been submitted successfully.",
      applicationId: application.id,
      notificationSent,
    });
  } catch (error) {
    console.error("Submit application error:", error);

    if (supabase && uploadedPaths.length > 0) {
      const { error: cleanupError } = await supabase.storage
        .from("career-documents")
        .remove(uploadedPaths);

      if (cleanupError) {
        console.error("File cleanup error:", cleanupError);
      }
    }

    return jsonResponse(
      { error: "An unexpected error occurred. Please try again." },
      500
    );
  }
});