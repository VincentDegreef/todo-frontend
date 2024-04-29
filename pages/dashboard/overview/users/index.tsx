import Header from "@/components/Header";
import UserService from "@/services/UserService";
import { StatusMessage, User } from "@/types";
import Head from "next/head";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const AdminUsersOverview = () => {
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [userRole, setUserRole] = useState<string | null>(null);


    const fetchUsers = async () => {
        if(sessionStorage.getItem("loggedInUserDetails") === null){
            setUserRole(null);
            return;
        }
        const user = JSON.parse(sessionStorage.getItem("loggedInUserDetails") || '');
        setUserRole(user.role);

        if(user.role !== "ADMIN"){
            return;
        }
        setStatusMessages([]);
        const response = await UserService.getAllUsers();
        if(response.ok){
            const users = await response.json();
            return users;
        }
        setStatusMessages([{message: "Error fetching users", type: "error"}]);
        return;
    };

    const {data,isLoading, error} = useSWR('users', fetchUsers);

    useInterval(() => {
        mutate('users', fetchUsers());
    }, 3000);


    return (
        <>
            <Head>
                <title>Users Overview</title>
                <meta name="description" content="Projects Overview" />
            </Head>
            <Header></Header>
            {userRole === "ADMIN" &&(<main>
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold text-center mt-8 mb-4">Users Overview</h1>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {statusMessages.map((statusMessage, index) => (
                            <div key={index} className="text-center font-bold text-red-500">
                                {statusMessage.message}
                            </div>
                        ))}
                        {data && (
                            <div>
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">ID</th>
                                            <th className="px-4 py-2">Username</th>
                                            <th className="px-4 py-2">Email</th>
                                            <th className="px-4 py-2">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((user: User) => (
                                            <tr key={user.id}>
                                                <td className="border px-4 py-2">{user.id}</td>
                                                <td className="border px-4 py-2">{user.username}</td>
                                                <td className="border px-4 py-2">{user.email}</td>
                                                <td className="border px-4 py-2">User</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        
                        )}
                    </div>
                </div>
            </main>)}
            {userRole !== "ADMIN" &&(<main className="p-4">
                <h1 className="pageTitle">Access Denied</h1>
                <p className="pageTitle">You are not authorized to view this page</p>
            </main>)}
        </>
    );
};

export default AdminUsersOverview;