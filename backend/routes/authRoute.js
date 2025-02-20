import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Signup
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await db.one(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        );
        res.json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(400).json({ error: "User already exists" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("requested");
        
        const user = await db.one("SELECT * FROM users WHERE email = $1", [email]);
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = generateToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.json({ message: "Login successful!", token });
        console.log("request sended");
    } catch (err) {
        res.status(400).json({ error: "User not found" });
    }
});

export default router;
