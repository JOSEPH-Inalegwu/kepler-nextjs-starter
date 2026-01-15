"use server";

import { createKeplarsClient } from "@/lib/keplars";
import type { FormState } from "@/types";

// Regex for basic email structure
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactForm(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    // Honeypot Check
    const honeypot = formData.get("_gotcha");
    if (honeypot) {
        console.warn("Bot detected and blocked.");
        // Return fake success 
        return { success: true, message: "Message sent successfully!" };
    }

    // DEMO MODE 
    // In "Demo Mode", pretend to send the email but do nothing.
    if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
        // Fake a 1-second delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: "Message sent successfully! (Demo Mode)" };
    }

    // 1. Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;


    // 2. Validate inputs
    const errors: FormState["errors"] = {};

    if (!name || name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
    }

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
    const apiKey = process.env.KEPLARS_API_KEY;
    const adminEmail = process.env.CONTACT_EMAIL;
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    // Fail if critical config is missing
    if (!apiKey || !adminEmail) {
        console.error("CRITICAL: KEPLARS_API_KEY or CONTACT_EMAIL is missing.");
        return {
            success: false,
            message: "Server configuration error. Please contact the site admin.",
        };
    }

    // 4. Send via Keplars
    try {
        const keplars = createKeplarsClient(apiKey);

        const result = await keplars.sendEmail({
            to: [adminEmail],
            subject: `New Lead: ${name}`,
            is_html: true,
            body: `                 
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f5; padding: 15px; border-radius: 8px;">${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
        });

        if (!result.success) {
            console.error("Keplars API Error:", result.error || "Unknown error");
            return {
                success: false,
                message: "Failed to send message. Please try again.",
            };
        }


        if (webhookUrl) {
            try {
                await fetch(webhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        // Discord/Slack friendly format
                        content: "🚀 **New Contact Form Submission!**",
                        embeds: [
                            {
                                title: "Lead Details",
                                color: 5814783, // Blurple
                                fields: [
                                    { name: "Name", value: name, inline: true },
                                    { name: "Email", value: email, inline: true },
                                    { name: "Message", value: message.length > 200 ? message.substring(0, 200) + "..." : message }
                                ]
                            }
                        ]
                    }),
                });
            } catch (webhookError) {
                // Log warning but allow success state
                console.warn("Webhook failed to send:", webhookError);
            }
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