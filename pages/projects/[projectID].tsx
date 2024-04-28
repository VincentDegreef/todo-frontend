import Header from "@/components/Header";
import CreateProjectTodoPopup from "@/components/projects/CreateProjectTodoPopup";
import ProjectTaskOverview from "@/components/projects/ProjectTaskOverview";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import useInterval from "use-interval";


const ProjectTaskPage: React.FC = () => {
    const router = useRouter();
    const { projectID } = router.query;

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleCreateTaskClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    
    
    useEffect(() => {
        if(projectID === undefined){
            router.push("/projects/overview");
        }
    }, [projectID]);

    // useInterval(() => {
    //     router.replace(router.asPath);
    //     console.log("Refreshing");
    // }, 2000);

    return(
       <>
            <Head>
                <title>Project Task</title>
                <meta name="description" content="Project Task Page" />
            </Head>
            <Header></Header>
            <div className="m-6">
                <FaArrowLeft size={25} title="Close Project" className="hover:text-red-500" onClick={()=> router.push("/projects/overview")}/>
            </div>
            <button className="bg-green-500 p-3 rounded-md text-white font-bold m-4" onClick={handleCreateTaskClick}>Add Task</button>
            <ProjectTaskOverview projectId={projectID as string}></ProjectTaskOverview>
            {isPopupOpen && <CreateProjectTodoPopup handleClosePopup={handleClosePopup} projectId={projectID as string} />}

       </>
    )
};

export default ProjectTaskPage;