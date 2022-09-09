import { Note } from "../models/noteSchema.js";

export const getNotes = async (req, res) => {
	try {
		const notes = await Note.find();
		res.render("notes.ejs", { notes });
	} catch (error) {
		console.log(error);
	}
};

export const addNote = async (req, res) => {
	//generate a random RGB color and assign it to the note
	const randomNum = () => {
		return Math.floor(Math.random() * (248 - 96 + 1) + 96);
	};
	const color = `rgb(${randomNum()},${randomNum()},${randomNum()})`;

	try {
		await Note.create({ note: req.body.note, color });
		console.log("Note added!");
		res.redirect("/notes");
	} catch (error) {
		console.log(error);
	}
};

export const deleteNote = async (req, res) => {
	console.log(req.body.id);
	try {
		await Note.findOneAndDelete({ _id: req.body.id });
		console.log("Deleted todo");
		res.json("Deleted it");
	} catch (error) {
		console.log(error);
	}
};
