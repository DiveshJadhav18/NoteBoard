import express from "express";
import { createNotes, deleteNotes, getAllNotes, getNotesbyId, updateNotes } from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);

router.post("/", createNotes);

router.get("/:id", getNotesbyId);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNotes);

export default router;