import UserService from "@/services/UserService";
import { Todo } from "@/types";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { SlArrowRightCircle } from "react-icons/sl";
import { FaTrashCan } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { styled } from '@mui/system';
import { Tooltip } from '@mui/material';

import TodoService from "@/services/TodoService";


const TodoOverview: React.FC = () => {
    const [userId, setUserId] = useState<number>(0);

    const fetchUserTodos = async () => {
        if(sessionStorage.getItem('loggedInUserDetails') === null){
            return;
        }
        
        const notStartedTodos: Todo[] = [];
        const inProgressTodos: Todo[] = [];
        const completedTodos: Todo[] = [];
        

        const userDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails') ?? '');
        setUserId(userDetails.id);
        const response = await UserService.getUserTodos(userId);
        if(response.ok){
            const data = await response.json();
            data.forEach((todo: any) => {
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
            console.log("Error fetching todos");
        }

        return [notStartedTodos, inProgressTodos, completedTodos];
    };

    const handleSetInProgress = async (todoId:number) => {
        
        const response = await TodoService.updateTodoInProgress(todoId);
        if(response.ok){
            console.log("Todo updated");
            mutate('userTodos', fetchUserTodos());
        } else {
            console.log("Error updating todo");
        }
    };

    const handleSetCompleted = async (todoId:number) => {
        const response = await TodoService.updateTodoCompleted(todoId);
        if(response.ok){
            console.log("Todo updated");
            mutate('userTodos', fetchUserTodos());
        } else {
            console.log("Error updating todo");
        }
    };

    const handleDeleteTask = async (todoId:number) => {
        const response = await TodoService.deleteTodoItem(todoId, userId);
        if(response.ok){
            console.log("Todo deleted");
            mutate('userTodos', fetchUserTodos());
        } else {
            console.log("Error deleting todo");
        }
    };


    const { data, isLoading, error } = useSWR('userTodos', fetchUserTodos)

    useInterval(() => {
        mutate('userTodos', fetchUserTodos());
    }, 1500);


    return (
        <>
            <div className="m-5 ">
                <div className="m-4">
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error loading todos</p>}
                    {data && (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="border-x-4">
                                <h2 className="text-2xl text-center border-b-4 p-2">Not started</h2>
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
                                {data[2].map((todo: Todo) => (
                                    <div key={todo.id} className="bg-green-500 p-4 m-3 rounded-lg text-center">
                                        <h3 className="font-bold p-2 text-xl">{todo.title}</h3>
                                        <h4 className="text-lg">Description: </h4>
                                        <p>{todo.description}</p>
                                        <div className="flex justify-end">
                                            {/* <Tooltip title="Delete task" >
                                                <FaTrashCan  onClick={() => handleDeleteTask(todo.id!)} size={20} className="text-red-500 text-xl hover:text-red-700 cursor-pointer" />
                                            </Tooltip> */}
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

export default TodoOverview;