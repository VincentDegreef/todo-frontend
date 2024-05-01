import ProjectsService from "@/services/ProjectsService";
import { useState } from "react";


const JoinProjectPopup:React.FC<{handleClosePopup: () => void}> = ({handleClosePopup}) => {
    const [inviteCode, setInviteCode] = useState<string>('');

    const validateForm = () => {
        let isValid = true;
        if (inviteCode === "") {
            isValid = false;
        }
        return isValid;
    };

    const handleJoinProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if(sessionStorage.getItem("loggedInUserDetails") === null){
            return;
        }
        const user = JSON.parse(sessionStorage.getItem("loggedInUserDetails") ?? '');
        const userId = user.id;

        const response = await ProjectsService.joinProject(inviteCode, userId);
        if (response.ok) {
            handleClosePopup();
        } else {
            console.log("Failed to join project");
        }
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <div>
                    <h1 className="pageTitle">Create Todo</h1>
                    <form className="max-w-lg mx-auto p-4 shadow-md rounded-lg" onSubmit={handleJoinProject}>
                        <div className="mb-4">
                            <label htmlFor="codeInput"> Invite Code</label>
                            <input value={inviteCode} onChange={event => setInviteCode(event.target.value)} type="text" id="codeInput" name="code" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4">
                            Join
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-4" onClick={handleClosePopup}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default JoinProjectPopup;