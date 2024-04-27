import UserService from "@/services/UserService";
import { Todo } from "@/types";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { SlArrowRightCircle } from "react-icons/sl";


const TodoOverview: React.FC = () => {

    const fetchUserTodos = async () => {
        if(sessionStorage.getItem('loggedInUserDetails') === null){
            return;
        }
        
        const notStartedTodos: Todo[] = [];
        const inProgressTodos: Todo[] = [];
        const completedTodos: Todo[] = [];
        

        const userDetails = JSON.parse(sessionStorage.getItem('loggedInUserDetails') ?? '');
        const userId = userDetails.id;
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


    const { data, isLoading, error } = useSWR('userTodos', fetchUserTodos)

    useInterval(() => {
        mutate('userTodos', fetchUserTodos());
    }, 5000);


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
                                    <div key={todo.id} className="bg-gray-200 p-4 m-3 rounded-lg text-center">
                                        <SlArrowRightCircle className="text-blue-500 text-xl" />
                                        <h3 className="font-bold p-2 text-xl">{todo.title}</h3>
                                        <h4 className="text-lg">Description: </h4>
                                        <p>{todo.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-x-4">
                                <h2 className="text-2xl text-center border-b-4 p-2">In progress</h2>
                                {data[1].map((todo: Todo) => (
                                    <div key={todo.id} className="bg-gray-200 p-4 m-3 rounded-lg text-center">
                                        <h3 className="font-bold p-2 text-xl">{todo.title}</h3>
                                        <h4 className="text-lg">Description: </h4>
                                        <p>{todo.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-x-4">
                                <h2 className="text-2xl text-center border-b-4 p-2">Completed</h2>
                                {data[2].map((todo: Todo) => (
                                    <div key={todo.id} className="bg-gray-200 p-4 m-3 rounded-lg text-center">
                                        <h3 className="font-bold p-2 text-xl">{todo.title}</h3>
                                        <h4 className="text-lg">Description: </h4>
                                        <p>{todo.description}</p>
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