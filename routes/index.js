import { Router } from "express";
import { getLogin, getRegister, logout, postLogin, postRegister } from "../controllers/auth.js";
import { getIndex } from "../controllers/index.js";
import { redirectIfUser } from "../middleware/auth.js";
const router = Router();

router.get("/", redirectIfUser, getIndex);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", logout);
router.get("/register", getRegister);
router.post("/register", postRegister);

export { router as indexRoutes };
