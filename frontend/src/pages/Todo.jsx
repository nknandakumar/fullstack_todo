import { useEffect, useState } from "react";
import { useTodoStore, useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";

const Todo = () => {
    const { todos, fetchTodos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
    const { logout } = useAuthStore();
    const [task, setTask] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <button className="mb-4 bg-red-500 text-white p-2 rounded" onClick={() => { logout(); navigate("/login"); }}>Logout</button>
            <div className="bg-white p-6 rounded shadow-md w-96">
                <input className="w-full p-2 border rounded mb-2" type="text" placeholder="New Task" value={task} onChange={(e) => setTask(e.target.value)} />
                <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={() => { addTodo(task); setTask(""); }}>Add Todo</button>
                <ul className="mt-4">
                    {todos.map(todo => (
                        <li key={todo.id} className="flex justify-between p-2 border-b">
                            <span className={todo.completed ? "line-through" : ""} onClick={() => toggleTodo(todo.id, !todo.completed)}>{todo.task}</span>
                            <button className="text-red-500" onClick={() => deleteTodo(todo.id)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
