"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { submitContactForm } from "@/app/actions";
import { SubmitButton } from "./submit-button";
import { Toast, type ToastVariant } from "./toast";
import type { FormState } from "@/types";

const initialState: FormState = {
    success: false,
    message: "",
};

export function ContactForm() {
    const [state, formAction] = useFormState(submitContactForm, initialState);
    const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.message) {
            // Show toast notification
            setToast({
                message: state.message,
                variant: state.success ? "success" : "error",
            });

            // Reset form on success
            if (state.success && formRef.current) {
                formRef.current.reset();
            }
        }
    }, [state]);

    return (
        <div className="w-full max-w-md">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
                    Get in Touch
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Send us a message and we'll get back to you as soon as possible.
                </p>
            </div>

            <form ref={formRef} action={formAction} className="space-y-5">
                {/* Name Field */}
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-black placeholder-zinc-400 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-600 dark:focus:border-white dark:focus:ring-white"
                        placeholder="John Doe"
                    />
                    {state.errors?.name && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                            {state.errors.name}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-black placeholder-zinc-400 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-600 dark:focus:border-white dark:focus:ring-white"
                        placeholder="john@example.com"
                    />
                    {state.errors?.email && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                            {state.errors.email}
                        </p>
                    )}
                </div>

                {/* Message Field */}
                <div>
                    <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-black placeholder-zinc-400 transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-600 dark:focus:border-white dark:focus:ring-white"
                        placeholder="Your message here..."
                    />
                    {state.errors?.message && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                            {state.errors.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <SubmitButton />
            </form>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    variant={toast.variant}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}

