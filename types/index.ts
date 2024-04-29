export type loginUser = {
    email: string;
    password: string;
};

export type User = {
    id?: number;
    username: string;
    password: string;
    email: string;
    role: string;
};

export type StatusMessage = {
    message: string
    type: "error" | "success"
};

export type Todo = {
    id?: number;
    title: string;
    description: string;
    notStarted: boolean;
    inProgress: boolean;
    completed: boolean;
};

export type Project = {
    id?: number;
    projectName: string;
    projectDescription: string;
    projectCreationDate: Date;
    projectInviteCode: string;
    // todos: Todo[];
    
};

export type ProjectCreate = {
    projectName: string;
    projectDescription: string;
};