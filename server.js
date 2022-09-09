import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/database.js";
import { authRoutes } from "./routes/auth.js";
import { indexRoutes } from "./routes/index.js";
import { noteRoutes } from "./routes/notes.js";
const app = express();

dotenv.config({ path: "./config/.env" });
connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/notes", noteRoutes);

app.listen(process.env.PORT, () => console.log(`Server fired up on PORT ${process.env.PORT}`));
