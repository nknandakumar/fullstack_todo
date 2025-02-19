import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";
// Authentication Store
export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("token") || null,

    login: async (email, password) => {
        try {
            const res = await axios.post("${BASE_URL}/auth/login", { email, password }, { withCredentials: true });
            localStorage.setItem("token", res.data.token);
            set({ user: res.data.user, token: res.data.token });
        } catch (err) {
            console.error(err.response.data);
        }
    },

    register: async (username, email, password) => {
        try {
            await axios.post("${BASE_URL}/auth/signup", { username, email, password });
            alert("Registration successful! Please log in.");
        } catch (err) {
            console.error(err.response.data);
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    },
}));

// Todo Store
export const useTodoStore = create((set) => ({
    todos: [],
    fetchTodos: async () => {
        const res = await axios.get(`${BASE_URL}/todos`, { withCredentials: true });
        set({ todos: res.data });
    },
    addTodo: async (task) => {
        const res = await axios.post(`${BASE_URL}/todos`, { task }, { withCredentials: true });
        set((state) => ({ todos: [...state.todos, res.data] }));
    },
    toggleTodo: async (id, completed) => {
        await axios.put(`${BASE_URL}/todos/${id}`, { completed }, { withCredentials: true });
        set((state) => ({
            todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
        }));
    },
    deleteTodo: async (id) => {
        await axios.delete(`${BASE_URL}/todos/${id}`, { withCredentials: true });
        set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
    },
}));
