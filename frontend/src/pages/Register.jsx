import { useState } from "react";
import { useAuthStore } from "../store";
import { useNavigate,Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const register = useAuthStore((state) => state.register);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(username, email, password);
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <input className="w-full p-2 border rounded mb-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input className="w-full p-2 border rounded mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="w-full p-2 border rounded mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="w-full bg-green-500 text-white p-2 rounded">Register</button>
            </form>
            <span className="flex items-center mt-10 "> Have an account then <Link to="/login" ><button className="w-full mx-2 cursor-pointer bg-blue-500 text-white p-2 rounded">Login</button> </Link> </span>
        </div>
    );
};

export default Register;
