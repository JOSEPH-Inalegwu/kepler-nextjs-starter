import React from "react";

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Central Planet */}
            <circle cx="12" cy="12" r="3" />

            {/* Orbit Ring 1 */}
            <path d="M19.4 15a1.85 1.85 0 0 0 .2-3.2 6 6 0 0 0-7.6-7.6a1.85 1.85 0 0 0-3.2.2" />

            {/* Orbit Ring 2 */}
            <path d="M4.6 9a1.85 1.85 0 0 0-.2 3.2 6 6 0 0 0 7.6 7.6a1.85 1.85 0 0 0 3.2-.2" />
        </svg>
    );
}