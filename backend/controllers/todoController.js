
import db from "../config/db.js";
import jwt from "jsonwebtoken";

export  const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ error: "Access denied" });

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }

}

export const getTodos =  async (req, res) => {
    const todos = await db.manyOrNone("SELECT * FROM todos WHERE user_id = $1", [req.user.id]);
    res.json(todos);
};
export const createTodo = async (req, res) => {
    const { task } = req.body;
    const newTodo = await db.one("INSERT INTO todos (user_id, task) VALUES ($1, $2) RETURNING *", [req.user.id, task]);
    res.json(newTodo);
};
export const updateTodo = async (req, res) => {
    const { completed } = req.body;
    await db.none("UPDATE todos SET completed = $1 WHERE id = $2 AND user_id = $3", [completed, req.params.id, req.user.id]);
    res.json({ message: "Todo updated" });
};
export const deleteTodo = async (req, res) => {
    await db.none("DELETE FROM todos WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
    res.json({ message: "Todo deleted" });
};

