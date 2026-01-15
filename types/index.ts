export type FormState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string;
        email?: string;
        message?: string;
    };
};

export type KeplarsEmailPayload = {
    to: string[];
    subject: string;
    body: string;
    is_html?: boolean;
    from?: string;
};

export type KeplarsEmailResponse = {
    success: boolean;
    data?: {
        id?: string;
        message?: string;
        email_status?: string;
    };
    error?: string;
};