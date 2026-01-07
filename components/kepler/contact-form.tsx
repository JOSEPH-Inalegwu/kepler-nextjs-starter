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
        <div className="w-full max-w-lg">
            {/* Header Section */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white">
                    Get in Touch
                </h2>
                <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
                    Send us a message and we'll get back to you as soon as possible.
                </p>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                <form ref={formRef} action={formAction} className="space-y-6">
                    {/* Name Field */}
                    <div className="group">
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-black placeholder-zinc-400 shadow-sm transition-all focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-white dark:focus:bg-zinc-950 dark:focus:ring-white/10"
                            placeholder="John Doe"
                        />
                        {state.errors?.name && (
                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {state.errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="group">
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-black placeholder-zinc-400 shadow-sm transition-all focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-white dark:focus:bg-zinc-950 dark:focus:ring-white/10"
                            placeholder="john@example.com"
                        />
                        {state.errors?.email && (
                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {state.errors.email}
                            </p>
                        )}
                    </div>

                    {/* Message Field */}
                    <div className="group">
                        <label
                            htmlFor="message"
                            className="mb-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-black placeholder-zinc-400 shadow-sm transition-all focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-white dark:focus:bg-zinc-950 dark:focus:ring-white/10"
                            placeholder="Tell us what's on your mind..."
                        />
                        {state.errors?.message && (
                            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {state.errors.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <SubmitButton />
                    </div>
                </form>
            </div>

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

