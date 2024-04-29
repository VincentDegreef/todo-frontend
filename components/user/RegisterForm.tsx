import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";


const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
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
        if(username === ""){
            isValid = false;
            setStatusMessages([{message: "Username is required", type: "error"}]);
        }
        return isValid;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!validateForm()){
            return;
        }
        const user= {
            username,
            password,
            email,
            role: "USER"
        };
        console.log(user);
        const response = await UserService.register(user);
        console.log(response);
        if(response.ok){
            setStatusMessages([{message: "Registration successful", type: "success"}]);
            router.push("/login")
        } else {
            const dataError = await response.json();
            const message = dataError.error;
            setStatusMessages([{message: message, type: "error"}]);
        }
    }
    return (
        <>
            <div className="m-4">
                <h1 className="pageTitle">Register</h1>

                <form onSubmit={handleRegister} className="max-w-lg mx-auto p-4 shadow-md rounded-lg">

                    {statusMessages.map((statusMessage, index) => (
                            <div key={index} className="text-center font-bold text-red-500">
                                {statusMessage.message}
                            </div>
                        ))}
                    <div className="mb-4">
                        <label htmlFor="usernameInput"> Username </label>
                        <input type="text" id="usernameInput" name="username" 
                        value={username} onChange={(event => setUsername(event.target.value))} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>

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
                        Register
                    </button>
                    
                    <button onClick={()=>router.push('/login')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default RegisterForm;