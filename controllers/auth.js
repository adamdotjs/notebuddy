import passport from "passport";
import validator from "validator";
import { User } from "../models/userSchema.js";

export const getLogin = (req, res) => {
	if (req.user) return res.redirect("/notes");
	res.render("login", {
		title: "Login",
	});
};

export const postLogin = (req, res, next) => {
	const validationErrors = [];

	if (!validator.isEmail(req.body.email)) {
		validationErrors.push({ msg: `Please enter a valid email address` });
	}

	if (validationErrors.length) {
		req.flash("errors", validationErrors);
		return res.redirect("/login");
	}

	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	});

	passport.authenticate("local", (error, user, info) => {
		if (error) return next(error);
		if (!user) {
			req.flash("errors", info);
		}
		req.logIn(user, (error) => {
			if (error) return next(error);
			req.flash("success", { msg: `Success! You're logged in.` });
			res.redirect(req.session.returnTo || "/notes");
		});
	})(req, res, next);
};

export const logout = (req, res) => {
	req.logout(() => console.log("User logged out"));
	req.session.destroy((error) => {
		if (error) console.log("Error: Failed to destroy the session during logout.", error);
		req.user = null;
		res.redirect("/");
	});
};
