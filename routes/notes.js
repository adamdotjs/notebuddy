import { Router } from "express";
import { addNote, deleteNote, getNotes } from "../controllers/notes.js";
import { ensureAuth } from "../middleware/auth.js";
const router = Router();

router.get("/", ensureAuth, getNotes);
router.post("/addNote", addNote);
router.delete("/deleteNote", deleteNote);

export { router as noteRoutes };
