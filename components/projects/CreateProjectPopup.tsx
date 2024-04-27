import ProjectsService from "@/services/ProjectsService";
import { StatusMessage } from "@/types";
import { useState } from "react";


const CreateProjectPopup: React.FC<{ handleClosePopup: () => void }> = ({ handleClosePopup }) => {
    const [projectName, setProjectName] = useState<string>('');
    const [projectDescription, setProjectDescription] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const validateForm = () => {
        let isValid = true;
        if (projectName === "") {
            isValid = false;
            setStatusMessages([{ message: "Project Name is required", type: "error" }]);
        }
        if (projectDescription === "") {
            isValid = false;
            setStatusMessages([{ message: "Description is required", type: "error" }]);
        }
        return isValid;
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessages([]);
        if (!validateForm()) {
            return;
        }

        const project = {
            projectName,
            projectDescription
        };

        if(sessionStorage.getItem("loggedInUserDetails") === null){
            setStatusMessages([{ message: "User not logged in", type: "error" }]);
            return;
        }
        const user = JSON.parse(sessionStorage.getItem("loggedInUserDetails") ?? '');
        const userId = user.id;
        
        const response = await ProjectsService.createProject(project, userId);
        if (response.ok) {
            setStatusMessages([{ message: "Project created successfully", type: "success" }]);
            handleClosePopup();
        } else {
            // const dataError = await response.json();
            // const message = dataError.error;
            setStatusMessages([{ message: "Failed to create Project", type: "error" }]);
        }
    };


    return (
        <div className="popup">
            <div className="popup-inner">
                <div>
                    <h1 className="pageTitle">Create Todo</h1>
                    <form className="max-w-lg mx-auto p-4 shadow-md rounded-lg" onSubmit={handleCreateProject}>
                        <div className="mb-4">
                            <label htmlFor="titleInput"> Project Name </label>
                            <input value={projectName} onChange={event => setProjectName(event.target.value)} type="text" id="titleInput" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descriptionInput"> Description </label>
                            <textarea value={projectDescription} onChange={event => setProjectDescription(event.target.value)} id="descriptionInput" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4">
                            Create
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4" onClick={handleClosePopup}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectPopup;

