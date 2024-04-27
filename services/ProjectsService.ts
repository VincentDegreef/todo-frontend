import { ProjectCreate } from "@/types";


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


const ProjectsService = {
    createProject
};

export default ProjectsService;