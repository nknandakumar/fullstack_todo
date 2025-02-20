import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

// Load user and token from localStorage safely
const getStoredUser = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
    }
};

// Auth Store
export const useAuthStore = create((set) => ({
    user: getStoredUser(),
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),

    login: async (email, password) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, { email, password }, { withCredentials: true });

            // Store token & user data
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            set({ user: res.data.user, token: res.data.token, isAuthenticated: true });
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            alert("Login failed! Check your credentials.");
        }
    },

    register: async (username, email, password) => {
        try {
            await axios.post(`${BASE_URL}/auth/signup`, { username, email, password });
            alert("Registration successful! Please log in.");
        } catch (err) {
            console.error("Registration failed:", err.response?.data || err.message);
            alert("Registration failed! Try again.");
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({ user: null, token: null, isAuthenticated: false });

        // Optionally reload the page to fully clear the session
        window.location.reload();
    },

    checkAuth: () => {
        const token = localStorage.getItem("token");
        const user = getStoredUser();

        if (token && user) {
            set({ user, token, isAuthenticated: true });
        } else {
            set({ user: null, token: null, isAuthenticated: false });
        }
    },
}));

// Todo Store
export const useTodoStore = create((set) => ({
    todos: [],
    
    fetchTodos: async () => {
        try {
            const res = await axios.get(`${BASE_URL}/todos`, { withCredentials: true });
            set({ todos: res.data });
        } catch (err) {
            console.error("Failed to fetch todos:", err.message);
        }
    },

    addTodo: async (task) => {
        try {
            const res = await axios.post(`${BASE_URL}/todos`, { task }, { withCredentials: true });
            set((state) => ({ todos: [...state.todos, res.data] }));
        } catch (err) {
            console.error("Failed to add todo:", err.message);
        }
    },

    toggleTodo: async (id, completed) => {
        try {
            await axios.put(`${BASE_URL}/todos/${id}`, { completed }, { withCredentials: true });
            set((state) => ({
                todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
            }));
        } catch (err) {
            console.error("Failed to update todo:", err.message);
        }
    },

    deleteTodo: async (id) => {
        try {
            await axios.delete(`${BASE_URL}/todos/${id}`, { withCredentials: true });
            set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
        } catch (err) {
            console.error("Failed to delete todo:", err.message);
        }
    },
}));

// Run this on app start to ensure authentication persists
useAuthStore.getState().checkAuth();
