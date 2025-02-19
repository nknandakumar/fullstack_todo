import express from 'express';
const router = express.Router();
import { getSignup, getLogin } from "../controllers/authController.js";

router.post("/signup",getSignup );
router.post("/login", getLogin);

export default router;