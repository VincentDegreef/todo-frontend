import Header from "@/components/Header";
import TodoService from "@/services/TodoService";
import { StatusMessage, Todo } from "@/types";
import Head from "next/head";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const AdminTasksOverview = () => {
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const fetchTasks = async () => {
        setStatusMessages([]);
        const response = await TodoService.getAllTodos();
        if(response.ok){
            const todos = await response.json();
            return todos;
        }
        setStatusMessages([{message: "Error fetching tasks", type: "error"}]);
        return;
    };

    const {data,isLoading, error} = useSWR('todos', fetchTasks);

    useInterval(() => {
        mutate('todos', fetchTasks());
    }, 3000);
    return (
        <>
            <Head>
                <title>Tasks Overview</title>
                <meta name="description" content="Projects Overview" />
            </Head>
            <Header></Header>
            <main>
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold text-center mt-8 mb-4">Tasks Overview</h1>
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
                                            <th className="px-4 py-2">Not Started</th>
                                            <th className="px-4 py-2">In Progress</th>
                                            <th className="px-4 py-2">Completed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((todo: Todo, index:number) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{todo.id}</td>
                                                <td className="border px-4 py-2">{todo.title}</td>
                                                <td className="border px-4 py-2">{todo.description}</td>
                                                <td className="border px-4 py-2">{todo.notStarted ? "Yes" : "No"}</td>
                                                <td className="border px-4 py-2">{todo.inProgress ? "Yes" : "No"}</td>
                                                <td className="border px-4 py-2">{todo.completed ? "Yes" : "No"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default AdminTasksOverview;