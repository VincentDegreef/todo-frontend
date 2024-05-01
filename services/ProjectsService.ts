import { ProjectCreate, Todo } from "@/types";


const createProject = async (project: ProjectCreate, userId: number) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/create/${userId}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(project)
    })
};

const getProjectTasks = async (projectId: string) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/tasks/${projectId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }); 
};

const deleteProject = async (projectId: number, userId: number) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/delete/${projectId}/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
};

const deleteTaskFromProject = async (projectId: number, taskId: number) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/deleteTask/${projectId}/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
};

const createProjectTask = async (task: Todo ,projectId: string ) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/addTask/${projectId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task)
    });
};

const getAllProjects = async () => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

};

const joinProject = async (inviteCode: string, userId: number) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/join/${userId}/${inviteCode}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
};

const getProject = async (projectId: string) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
};


const ProjectsService = {
    createProject,
    getProjectTasks,
    deleteProject,
    deleteTaskFromProject,
    createProjectTask,
    getAllProjects,
    joinProject,
    getProject


};

export default ProjectsService;