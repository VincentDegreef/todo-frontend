export type loginUser = {
    email: string;
    password: string;
};

export type User = {
    id?: number;
    username: string;
    password: string;
    email: string;
};

export type StatusMessage = {
    message: string
    type: "error" | "success"
};