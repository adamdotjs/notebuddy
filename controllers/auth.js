import passport from "passport";
import validator from "validator";
import { User } from "../models/userSchema.js";

export const getLogin = (req, res) => {
	if (req.user) return res.redirect("/notes");
	res.render("login", { title: "Login" });
};

export const postLogin = (req, res, next) => {
	// handle error cases
	const validationErrors = [];
	if (!validator.isEmail(req.body.email)) {
		validationErrors.push({
			msg: "Please enter a valid email address",
		});
	}
	if (validator.isEmpty(req.body.password)) {
		validationErrors.push({ msg: "Password cannot be blank" });
	}

	// by default, validator removes dots from gmail email addresses as gmail considers with or without dots the same. Set this to false to preserve original email address.
	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	});

	passport.authenticate("local", (error, user, info) => {
		if (error) return next(error);

		// if no user found, redirect to login page
		if (!user) {
			req.flash("errors", info);
			return res.redirect("/login");
		}

		// upon successful login, return to previous page or redirect to view notes page
		req.logIn(user, (error) => {
			if (error) return next(error);
			req.flash("success", { msg: "Success! You are logged in." });
			res.redirect(req.session.returnTo || "/notes");
		});
	})(req, res, next);
};

// log out user and redirect to index
export const logout = (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			console.log("Error: Failed to destroy session during logout", error);
		}
		req.logout(() => console.log("User has logged out"));
		req.user = null;
		res.redirect("/");
	});
};

export const getRegister = (req, res) => {
	// redirect to notes page if already logged in, else render registration page
	if (req.user) return res.redirect("/notes");
	res.render("register", { title: "Create account" });
};

export const postRegister = (req, res, next) => {
	// handle error cases
	const validationErrors = [];
	if (!validator.isEmail(req.body.email)) {
		validationErrors.push({ msg: "Please enter a valid email address" });
	}
	if (!validator.isLength(req.body.password, { min: 8 })) {
		validationErrors.push({ msg: "Password must be at least 8 characters long" });
	}
	if (req.body.password !== req.body.confirmPassword) {
		validationErrors.push({ msg: "Passwords do not match" });
	}
	if (validationErrors.length) {
		req.flash("errors", validationErrors);
		return res.redirect("../register");
	}

	// by default, validator removes dots from gmail email addresses as gmail considers with or without dots the same. Set this to false to preserve original email address.
	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	});

	const user = new User({
		email: req.body.email,
		password: req.body.password,
	});

	User.findOne({ email: req.body.email }, (error, existingUser) => {
		if (error) return next(error);

		// handle existing user
		if (existingUser) {
			req.flash("errors", {
				msg: "An account with that email address already exists",
			});
			return res.redirect("../register");
		}

		user.save((error) => {
			if (error) return next(error);

			req.logIn(user, (error) => {
				if (error) return next(error);
				res.redirect("/notes");
			});
		});
	});
};
