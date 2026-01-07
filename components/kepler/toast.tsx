"use client";

import { useEffect, useState } from "react";

export type ToastVariant = "success" | "error";

interface ToastProps {
    message: string;
    variant: ToastVariant;
    onClose: () => void;
    duration?: number;
}

export function Toast({ message, variant, onClose, duration = 5000 }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        setIsVisible(true);

        // Auto-dismiss after duration
        const timer = setTimeout(() => {
            setIsVisible(false);
            // Wait for exit animation before removing
            setTimeout(onClose, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const variantStyles = {
        success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-900 dark:text-green-200",
        error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-900 dark:text-red-200",
    };

    const iconStyles = {
        success: "text-green-600 dark:text-green-400",
        error: "text-red-600 dark:text-red-400",
    };

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300 ${variantStyles[variant]
                } ${isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
            role="alert"
        >
            {/* Icon */}
            <div className="flex-shrink-0">
                {variant === "success" ? (
                    <svg
                        className={`h-5 w-5 ${iconStyles.success}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg
                        className={`h-5 w-5 ${iconStyles.error}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>

            {/* Message */}
            <p className="text-sm font-medium">{message}</p>

            {/* Close Button */}
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                }}
                className="ml-auto flex-shrink-0 opacity-70 transition-opacity hover:opacity-100"
                aria-label="Close"
            >
                <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
        </div>
    );
}
