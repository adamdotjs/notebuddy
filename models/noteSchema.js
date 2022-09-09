import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
	note: String,
	color: String,
});

export const Note = mongoose.model("Note", NoteSchema);
