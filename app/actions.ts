"use server";

import { createKeplerClient } from "@/lib/kepler";
import type { FormState } from "@/types";

// Regex for basic email structure
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    // 1. Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // 2. Validate inputs
    const errors: FormState["errors"] = {};

    if (!name || name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
    }

    // Stronger validation
    if (!email || !EMAIL_REGEX.test(email)) {
        errors.email = "Please enter a valid email address";
    }

    if (!message || message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: "Please fix the errors below",
            errors,
        };
    }

    // 3. Security & Config Check
    const apiKey = process.env.KEPLER_API_KEY;
    const adminEmail = process.env.CONTACT_EMAIL || "inalegwu@77stack.dev"; // Where you receive it

    if (!apiKey) {
        console.error("CRITICAL: KEPLER_API_KEY is missing.");
        return {
            success: false,
            message: "Server configuration error.",
        };
    }

    // 4. Send via Kepler
    try {
        const kepler = createKeplerClient(apiKey);

        const result = await kepler.sendEmail({
            to: [adminEmail],       // ✅ UPDATED: Must be an array
            // from: systemEmail,   // Removed: Kepler handles this automatically based on your account
            subject: `New Lead: ${name}`,
            is_html: true,          // ✅ UPDATED: Required flag
            body: `                 
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f5; padding: 15px; border-radius: 8px;">${message.replace(/\n/g, "<br>")}</p>
        </div>
      `, // ✅ UPDATED: Changed 'html' to 'body'
        });

        if (!result.success) {
            console.error("Kepler API Error:", result.error || "Unknown error");
            return {
                success: false,
                message: "Failed to send message. Please try again.",
            };
        }

        return {
            success: true,
            message: "Message sent successfully!",
        };

    } catch (error) {
        console.error("Unexpected Action Error:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}