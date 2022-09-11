import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
	note: {
		type: String,
		required: true,
	},
	color: {
		type: String,
	},
	userId: {
		type: String,
		required: true,
	},
});

export const Note = mongoose.model("Note", NoteSchema);
