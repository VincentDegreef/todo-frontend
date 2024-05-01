import Header from "@/components/Header";
import ProjectsService from "@/services/ProjectsService";
import { Project, StatusMessage } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const AdminProjectOverview= () => {
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [userRole, setUserRole] = useState<string | null>(null);

    const fetchProjects = async () => {
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
        const response = await ProjectsService.getAllProjects();
        if(response.ok){
            const projects = await response.json();
            return projects;
        }
        setStatusMessages([{message: "Error fetching projects", type: "error"}]);
        return;
    };

    const {data,isLoading, error} = useSWR('projects', fetchProjects);

    useInterval(() => {
        mutate('projects', fetchProjects());
    }, 3000);


    return (
        <>
            <Head>
                <title>Projects Overview</title>
                <meta name="description" content="Projects Overview" />
            </Head>
            <Header></Header>
            {userRole === "ADMIN" &&(<main>
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold text-center mt-8 mb-4">Projects Overview</h1>
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
                                            <th className="px-4 py-2">Title</th>
                                            <th className="px-4 py-2">Description</th>
                                            <th className="px-4 py-2">Project Owner</th>
                                            <th className="px-4 py-2">Created At</th>
                                            <th className="px-4 py-2">Invite Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((project: Project, index: number) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{project.id}</td>
                                                <td className="border px-4 py-2">{project.projectName}</td>
                                                <td className="border px-4 py-2">{project.projectDescription}</td>
                                                <td className="border px-4 py-2">{project.projectOwner}</td>
                                                <td className="border px-4 py-2">{project.projectCreationDate.toString()}</td>
                                                <td className="border px-4 py-2">{project.projectInviteCode}</td>
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

export default AdminProjectOverview;