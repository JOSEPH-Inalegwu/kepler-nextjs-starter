import type { KeplarsEmailPayload, KeplarsEmailResponse } from "@/types";

const KEPLARS_BASE_URL = "https://api.keplers.email";

export class KeplarsClient {
    private apiKey: string;

    constructor(apiKey: string) {
        if (!apiKey) throw new Error("Keplars API key is required");
        this.apiKey = apiKey;
    }

    async sendEmail(payload: KeplarsEmailPayload): Promise<KeplarsEmailResponse> {
        const endpoint = `${KEPLARS_BASE_URL}/api/v1/send-email/instant`;

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

export function createKeplarsClient(apiKey: string): KeplarsClient {
    return new KeplarsClient(apiKey);
}