export interface User {
    _id: string;
    email: string;
    password: string;
    created_at?: string;
    updated_at?: string;
}

export interface Todo {
    _id: string;
    title: string;
    description?: string;
    status?: "done" | "pending";
    created_at?: string;
    updated_at?: string;
    user?: User;
}