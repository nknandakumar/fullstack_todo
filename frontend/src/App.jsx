import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Todo /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
