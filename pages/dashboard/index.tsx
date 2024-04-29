import Header from "@/components/Header";
import Head from "next/head";
import { FaUsers } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { PiProjectorScreenDuotone } from "react-icons/pi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



const Dashboard: React.FC = () => {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        if(sessionStorage.getItem("loggedInUserDetails") === null){
            setUserRole(null);
            return;
        }
        const user = JSON.parse(sessionStorage.getItem("loggedInUserDetails") || '');
        setUserRole(user.role);
    }, []);


    return (
      <>
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="Dashboard" />
          <link rel="icon" href="public/favicon.ico" />
        </Head>
        <Header />
      {userRole === "ADMIN" &&(<main className="p-4">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold mb-2">View all users</h2>
              <FaUsers size={30} className="hover:text-blue-500" onClick={()=> router.push("/dashboard/overview/users")} />
              <p className="mt-2 text-gray-600">Get an overview of all the users.</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold mb-2">View all projects</h2>
              <PiProjectorScreenDuotone size={30} className="hover:text-blue-500" onClick={()=> router.push("/dashboard/overview/projects")} />
              <p className="mt-2 text-gray-600">Get an overview of all the projects.</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold mb-2">View all tasks</h2>
              <FaTasks size={30} className="hover:text-blue-500" onClick={()=> router.push("/dashboard/overview/tasks")} />
              <p className="mt-2 text-gray-600">Get an overview of all the tasks</p>
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
  
  export default Dashboard;