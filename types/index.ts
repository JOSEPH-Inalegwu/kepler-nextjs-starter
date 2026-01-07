export type FormState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string;
        email?: string;
        message?: string;
    };
};

export type KeplerEmailPayload = {
    to: string[];
    subject: string;
    body: string;
    is_html?: boolean;
    from?: string;
};

export type KeplerEmailResponse = {
    success: boolean;
    data?: {
        id?: string;
        message?: string;
        email_status?: string;
    };
    error?: string;
};