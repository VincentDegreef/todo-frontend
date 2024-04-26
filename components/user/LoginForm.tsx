import UserService from "@/services/UserService";
import { StatusMessage, loginUser } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";


const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const router = useRouter();

    const validateForm = () => {
        let isValid = true;
        if(email === ""){
            isValid = false;
            setStatusMessages([{message: "Email is required", type: "error"}]);
        }
        if(password === ""){
            isValid = false;
            setStatusMessages([{message: "Password is required", type: "error"}]);
        }
        return isValid;
    };


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!validateForm()){
            return;
        }
        const user: loginUser = {
            email,
            password
        };
        const response = await UserService.login(user);
        if(response.ok){
            const data = await response.json();
            sessionStorage.setItem("loggedInUserDetails", JSON.stringify(data));
                sessionStorage.setItem("loggedInUserToken", JSON.stringify(
                    {token: data.token, 
                    user: data.user
                    }));
            setStatusMessages([{message: "Login successful", type: "success"}]);
            router.push("/")
            
        } else {
            setStatusMessages([{message: "Login failed", type: "error"}]);
        }
    }
    return (
        <>
            <div className="m-4">
                <h1 className="pageTitle">Login</h1>
                
                <form onSubmit={handleLogin} className="max-w-lg mx-auto p-4 shadow-md rounded-lg">
                    {statusMessages.map((statusMessage, index) => (
                        <div key={index} className="text-center font-bold text-red-500 ">
                            {statusMessage.message}
                        </div>
                    ))}
                    <div className="mb-4">
                        <label htmlFor="emailInput"> Email </label>
                        <input type="email" id="emailInput" name="email" 
                        value={email} onChange={(event => setEmail(event.target.value))} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="passwordInput"> Password </label>
                        <input type="password" id="passwordInput" name="password" 
                        value={password} onChange={(event => setPassword(event.target.value))}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>       
                    
    
                
                    <button type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4">
                        Login
                    </button>
                </form>
            </div>
        </>
    )
};

export default LoginForm;