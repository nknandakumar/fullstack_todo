import express from "express";
import { getTodos, createTodo, updateTodo, deleteTodo,authenticate } from "../controllers/todoController.js";
const router = express.Router();

router.get("/", authenticate , getTodos );
router.post("/", authenticate , createTodo );
router.put("/:id", authenticate , updateTodo );
router.delete("/:id", authenticate ,  deleteTodo);

export default router;