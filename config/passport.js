import { Strategy } from "passport-local";
import { User } from "../models/userSchema.js";
const LocalStrategy = Strategy;

export const passportConfig = (passport) => {
	passport.use(
		new LocalStrategy({ username: "email" }, (error, user) => {
			if (error) return done(error);
			if (!user) return done(null, false, { msg: `Email ${email} not found` });
			if (!user.password) {
				return done(null, false, {
					msg: `Your account was registered with a sign-in provider. To enable password login, sign in using a provider and then set your password under your user profile.`,
				});
			}

			user.comparePassword(password, (error, isMatch) => {
				if (error) return done(error);
				if (isMatch) return done(null, user);
				return done(null, false, { msg: `Invalid email or password.` });
			});
		})
	);

	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => User.findById(id, (error, user) => done(error, user)));
};
