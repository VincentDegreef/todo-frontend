import { User, loginUser } from "@/types";

const login = async (user: loginUser) => {
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rest/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    
    })
};

const register = async (user: User) => {
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rest/auth/register`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    
    })
};

const getUserTodos = async (userId: number) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/userTodos/${userId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }})
};

const getUserProjects = async (userId: number) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/userProject/${userId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }})
};


const UserService = {
    login,
    register,
    getUserTodos,
    getUserProjects
};

export default UserService;