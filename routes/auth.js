import { Router } from "express";
import { getAuth } from "../controllers/auth.js";
const router = Router();

router.get("/login", getAuth);

export { router as authRoutes };
