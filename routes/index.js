import { Router } from "express";
import { getLogin, getRegister, logout, postLogin, postRegister } from "../controllers/auth.js";
import { getIndex } from "../controllers/index.js";
const router = Router();

router.get("/", getIndex);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/logout", logout);
router.get("/register", getRegister);
router.post("/register", postRegister);

export { router as indexRoutes };
