import ProjectsService from "@/services/ProjectsService";
import TodoService from "@/services/TodoService";
import { Todo } from "@/types";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { SlArrowRightCircle } from "react-icons/sl";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";




interface ProjectTaskOverviewProps {
    projectId: string | undefined;
}

const ProjectTaskOverview: React.FC<ProjectTaskOverviewProps> = ({ projectId }) => {
    const [projectTitle, setProjectTitle] = useState<string>("");

    const fetchProjectTasks = async () => {
        if(!projectId){
            return;
        }
        const notStartedTodos: Todo[] = [];
        const inProgressTodos: Todo[] = [];
        const completedTodos: Todo[] = [];
        
        const projectResponse = await ProjectsService.getProject(projectId);
        if(projectResponse.ok){
            const project = await projectResponse.json();

            if(project === null){
                return;
            }
            setProjectTitle(project.projectName);

            const tasks = project.tasks;

            tasks.forEach((todo: any) => {
                if(todo.notStarted === true){
                    notStartedTodos.push(todo);
                } else if(todo.inProgress === true){
                    inProgressTodos.push(todo);
                }
                else if(todo.completed === true){
                    completedTodos.push(todo);
                }
            });
        } else {
            console.log("Error fetching project");
        }
        // const response = await ProjectsService.getProjectTasks(projectId);
        // if(response.ok){
        //     const data = await response.json();
        //     data.forEach((todo: any) => {
        //         if(todo.notStarted === true){
        //             notStartedTodos.push(todo);
        //         } else if(todo.inProgress === true){
        //             inProgressTodos.push(todo);
        //         }
        //         else if(todo.completed === true){
        //             completedTodos.push(todo);
        //         }
        //     });
        // } else {
        //     console.log("Error fetching todos");
        // }

        return [notStartedTodos, inProgressTodos, completedTodos];

        
        
    };

    const handleSetInProgress = async (todoId:number) => {
        
        const response = await TodoService.updateTodoInProgress(todoId);
        if(response.ok){
            console.log("Todo updated");
            mutate('userTodos', fetchProjectTasks());
        } else {
            console.log("Error updating todo");
        }
    };

    const handleSetCompleted = async (todoId:number) => {
        const response = await TodoService.updateTodoCompleted(todoId);
        if(response.ok){
            console.log("Todo updated");
            mutate('userTodos', fetchProjectTasks());
        } else {
            console.log("Error updating todo");
        }
    };

    const handleDeleteTask = async (todoId:number) => {
        const response = await ProjectsService.deleteTaskFromProject(parseInt(projectId!), todoId);
        if(response.ok){
            console.log("Todo deleted");
            mutate('userTodos', fetchProjectTasks());
        } else {
            console.log("Error deleting todo");
        }
    };


    const { data, isLoading, error } = useSWR('fetchProjectTask', fetchProjectTasks)

    useInterval(() => {
        mutate('fetchProjectTask', fetchProjectTasks());
    }, 2000);


    return (
        <>
            <div className="m-5 ">
                <div className="m-4">
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error loading todos</p>}
                    <h1 className="text-3xl text-center font-bold m-4 text-black">{projectTitle}</h1>
                    {data && (
                        
                        <div className="grid grid-cols-3 gap-4">
                            <div className="border-x-4">
                                <h2 className="text-2xl text-center border-b-4 p-2">Not started</h2>
                                {data[0].length === 0 && <p className="text-center text-lg text-red-500 font-bold">No tasks</p>}
                                {data[0].map((todo: Todo) => (
                                    <div key={todo.id} className="bg-gray-500 text-white p-4 m-3 rounded-lg text-center">
                                        
                                        <h3 className="font-bold p-2 text-xl">{todo.title}</h3>
                                        <h4 className="text-lg">Description: </h4>
                                        <p>{todo.description}</p>
                                        <div className="flex justify-end gap-2">
                                            
                                            <SlArrowRightCircle title="Set task in progress" onClick={() => handleSetInProgress(todo.id!)} size={25} className="text-white text-xl hover:text-black cursor-pointer" />
                                            <FaTrashCan title="Delete task" onClick={() => handleDeleteTask(todo.id!)} size={25} className="text-red-500 text-xl hover:text-red-700 cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-x-4">
                                <h2 className="text-2xl text-center border-b-4 p-2">In progress</h2>
                                {data[1].length === 0 && <p className="text-center text-lg text-red-500 font-bold">No tasks</p>}
                                {data[1].map((todo: Todo) => (
                                    <div key={todo.id} className="bg-blue-500 p-4 m-3 rounded-lg text-center">
                                        
                                        <h3 className="font-bold p-2 text-xl">{todo.title}</h3>
                                        <h4 className="text-lg">Description: </h4>
                                        <p>{todo.description}</p>
                                        <div className="flex justify-end gap-2">
                                            <IoMdCheckmarkCircleOutline title="Complete Task" onClick={() => handleSetCompleted(todo.id!)} size={25} className="text-white text-xl hover:text-black cursor-pointer" />
                                            <FaTrashCan  title="Delete task" onClick={() => handleDeleteTask(todo.id!)} size={25} className="text-red-500 text-xl hover:text-red-700 cursor-pointer" />
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>
                            <div className="border-x-4">
                                <h2 className="text-2xl text-center border-b-4 p-2">Completed</h2>
                                {data[2].length === 0 && <p className="text-center text-lg text-red-500 font-bold">No tasks</p>}
                                {data[2].map((todo: Todo) => (
                                    <div key={todo.id} className="bg-green-500 p-4 m-3 rounded-lg text-center">
                                        <h3 className="font-bold p-2 text-xl">{todo.title}</h3>
                                        <h4 className="text-lg">Description: </h4>
                                        <p>{todo.description}</p>
                                        <div className="flex justify-end">
                                            <FaTrashCan title="Delete task" onClick={() => handleDeleteTask(todo.id!)} size={25} className="text-red-500 text-xl hover:text-red-700 cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProjectTaskOverview;