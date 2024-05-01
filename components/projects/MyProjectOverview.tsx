import UserService from "@/services/UserService";
import { Project, StatusMessage } from "@/types";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import CreateProjectPopup from "./CreateProjectPopup";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { FaTrashCan } from "react-icons/fa6";
import ProjectsService from "@/services/ProjectsService";
import { MdOutlineNewLabel } from "react-icons/md";
import { MdConnectWithoutContact } from "react-icons/md";
import JoinProjectPopup from "./joinProjectPopup";


const MyProjectsOverview: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false);
    const [userId, setUserId] = useState<number>(0);
    const router = useRouter();
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [showInviteCode, setShowInviteCode] = useState<boolean>(false);

    const handleCreateTaskClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleJoinProjectClick = () => {
        setIsJoinPopupOpen(true);
    };

    const handleCloseJoinPopup = () => {
        setIsJoinPopupOpen(false);
    };

    const toggleInviteCode = () => {
        setShowInviteCode(!showInviteCode);
    };

    const fetchUserProjects = async () => {
        setStatusMessages([]);
        if(sessionStorage.getItem('loggedInUserDetails') === null){
            return;
        }
        const userDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails') ?? '');
        setUserId(userDetails.id);

        const response = await UserService.getUserProjects(userId);
        if(response.ok){
            const projects = await response.json();
            return projects;
        }
        const dataError = await response.json();
        const message = dataError.error;
        setStatusMessages([{message: message, type: "error"}]);
        
        return;
    };

    const handleDeleteProject = async (projectId: number) => {
        const response = await ProjectsService.deleteProject(projectId, userId);
        if(response.ok){
            console.log("Project deleted");
            mutate('userProjects', fetchUserProjects());
        } else {
            console.log("Error deleting project");
        }

    } 

    const { data, isLoading, error } = useSWR('userProjects', fetchUserProjects)

    useInterval(() => {
        mutate('userProjects', fetchUserProjects());
    }, 3000);

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold text-center mt-8 mb-4">Projects</h1>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-2 flex flex-row justify-between">
                            <button onClick={handleCreateTaskClick} className="bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4 flex flex-row gap-1 items-center" aria-label="Create New Project"><MdOutlineNewLabel size={20} /> New Project</button>
                            <button onClick={handleJoinProjectClick} className="bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4 flex flex-row gap-1 items-center"> <MdConnectWithoutContact size={20}/> Join Project</button>
                        </div>
                    {statusMessages.map((statusMessage, index) => (
                        <div key={index} className="text-center font-bold text-red-500">
                            {statusMessage.message}
                        </div>
                    ))}
                    {data && (
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg font-bold mb-2">Projects:</label>                               
                                <ul>
                                    {data.map((project: Project) => (
                                        <div className="bg-green-600 p-4 mb-4 rounded-md text-white flex justify-between">
                                            <div>
                                                <h3 className="font-bold m-2">{project.projectName}</h3>
                                                <div className="flex mb-2">
                                                    <p>Invite Code: </p>
                                                    {/* Conditionally render invite code based on visibility state */}
                                                    {showInviteCode ? (
                                                        <p onClick={toggleInviteCode} className="font-bold mx-2 cursor-pointer">{project.projectInviteCode}</p>
                                                    ) : (
                                                        <button onClick={toggleInviteCode} className="text-black underline focus:outline-none mx-2">Reveal Invite Code</button>
                                                    )}
                                                </div>
                                                <div className="mb-2">
                                                    <p>Description: </p>
                                                    <p className="font-bold mx-2">{project.projectDescription}</p> 
                                                </div>
                                                <p className="text-black">Created At: {project.projectCreationDate.toLocaleString()}</p>
                                            </div>

                                            <div className="flex flex-col justify-between">
                                                <FaArrowRight title="Open Project" size={25} className="hover:text-black" onClick={()=> router.push(`/projects/${project.id}`)}/>
                                                <FaTrashCan title="Delete task" onClick={() => handleDeleteProject(project.id!)} size={25} className="text-red-500 text-xl hover:text-red-700 cursor-pointer" />
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {isPopupOpen && <CreateProjectPopup handleClosePopup={handleClosePopup} />}
                    {isJoinPopupOpen && <JoinProjectPopup handleClosePopup={handleCloseJoinPopup} />}
                </div>
            </div>
        </>
    )
};

export default MyProjectsOverview;