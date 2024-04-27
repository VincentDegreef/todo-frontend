import { Todo } from "@/types";

const createTodo = (todo: Todo, userId:number) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todoItems/create/${userId}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(todo)
    
    })
};

const updateTodoInProgress = (todoId: number) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todoItems/inprogress/${todoId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
};

const deleteTodoItem = (todoId: number, userId: number) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todoItems/delete/${todoId}/${userId}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
};

const updateTodoCompleted = (todoId: number) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUserToken') ?? '').token;
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todoItems/done/${todoId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
};


const TodoService = {
    createTodo,
    updateTodoInProgress,
    deleteTodoItem,
    updateTodoCompleted
};

export default TodoService;