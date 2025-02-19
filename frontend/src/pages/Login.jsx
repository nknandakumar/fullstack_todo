import { useState } from "react";
import { useAuthStore } from "../store";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input className="w-full p-2 border rounded mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="w-full p-2 border rounded mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
           <span className="flex items-center mt-10 ">Don't Have an account then <Link to="/register" ><button className="w-full mx-2 cursor-pointer bg-red-500 text-white p-2 rounded">SignUp</button> </Link> </span>
        </div>
    );
};

export default Login;
