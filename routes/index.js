import { Router } from "express";
import { getIndex } from "../controllers/index.js";
const router = Router();

router.get("/", getIndex);

export { router as indexRoutes };
