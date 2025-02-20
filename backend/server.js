import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import todoRoute from "./routes/todoRoute.js";
const app = express();
const port = 3000;
dotenv.config();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRoute)
app.use("/todos", todoRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});