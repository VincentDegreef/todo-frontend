import UserService from "@/services/UserService";
import { Project } from "@/types";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import CreateProjectPopup from "./CreateProjectPopup";


const MyProjectsOverview: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleCreateTaskClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const fetchUserProjects = async () => {
        if(sessionStorage.getItem('loggedInUserDetails') === null){
            return;
        }
        const userDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails') ?? '');
        const userId = userDetails.id;

        const response = await UserService.getUserProjects(userId);
        if(!response.ok){
            return;
        }
        const projects = await response.json();
        return projects;
    };

    const { data, isLoading, error } = useSWR('userProjects', fetchUserProjects)

    useInterval(() => {
        mutate('userProjects', fetchUserProjects());
    }, 2000);

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-3xl font-semibold text-center mt-8 mb-4">Projects</h1>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error loading projects</p>}
                        <div className="mb-2">
                            <button onClick={handleCreateTaskClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4">New Project</button>
                        </div>
                    {data && (
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg font-bold mb-2">Projects:</label>
                                
                                <ul>
                                    {data.map((project: Project) => (
                                        <div className="bg-blue-500 p-4 mb-4 rounded-md text-white">
                                            <h3 className="font-bold m-2">{project.projectName}</h3>
                                            <div className="mb-2">
                                                <p>Description: </p>
                                                <p className="font-bold mx-2">{project.projectDescription}</p> 
                                            </div>
                                            <p className="text-black">Created At: {project.projectCreationDate.toLocaleString()}</p>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    {isPopupOpen && <CreateProjectPopup handleClosePopup={handleClosePopup} />}
                </div>
            </div>
        </>
    )
};

export default MyProjectsOverview;