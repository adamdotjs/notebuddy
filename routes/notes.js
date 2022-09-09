import { Router } from "express";
import { addNote, deleteNote, getNotes } from "../controllers/notes.js";
const router = Router();

router.get("/", getNotes);
router.post("/addNote", addNote);
router.delete("/deleteNote", deleteNote);

export { router as noteRoutes };
