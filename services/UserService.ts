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


const UserService = {
    login,
    register
};

export default UserService;