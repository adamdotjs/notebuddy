import MongoStore from "connect-mongo";
import * as dotenv from "dotenv";
import express from "express";
import flash from "express-flash";
import session from "express-session";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import { connectDB } from "./config/database.js";
import { passportConfig } from "./config/passport.js";
import { indexRoutes } from "./routes/index.js";
import { noteRoutes } from "./routes/notes.js";
const app = express();
const logger = morgan;

dotenv.config({ path: "./config/.env" });

passportConfig(passport);
connectDB();

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

// handle user session
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
		}),
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated();
	next();
});

// routes
app.use("/", indexRoutes);
app.use("/notes", noteRoutes);

app.listen(process.env.PORT, () => console.log(`Server fired up on PORT ${process.env.PORT}`));
