import type { KeplerEmailPayload, KeplerEmailResponse } from "@/types";

const KEPLER_BASE_URL = "https://api.keplers.email";

export class KeplerClient {
    private apiKey: string;

    constructor(apiKey: string) {
        if (!apiKey) throw new Error("Kepler API key is required");
        this.apiKey = apiKey;
    }

    async sendEmail(payload: KeplerEmailPayload): Promise<KeplerEmailResponse> {
        const endpoint = `${KEPLER_BASE_URL}/api/v1/send-email/instant`;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Kepler Debug:", data);
                return {
                    success: false,
                    error: data.message || "Unknown Error",
                };
            }

            return {
                success: true,
                data: data.data
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : "Network Error",
            };
        }
    }
}

export function createKeplerClient(apiKey: string): KeplerClient {
    return new KeplerClient(apiKey);
}