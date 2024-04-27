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


const TodoService = {
    createTodo
};

export default TodoService;