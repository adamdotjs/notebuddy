import bcrypt from "bcrypt";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
	},
	password: String,
});

//add middleware to handle hashing passwords. NEVER store as plain text!
UserSchema.pre("save", (next) => {
	const user = this;
	//only hash the password if it's new or been modified
	if (!user.isModified("password")) return next();

	bcrypt.genSalt(10, (error, salt) => {
		if (error) return next(error);

		bcrypt.hash(user.password, salt, (error, hash) => {
			if (error) return next(error);
			user.password = hash;
			next();
		});
	});
});

//password verification
UserSchema.methods.comparePassword = (candidatePassword, cb) => {
	bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
		cb(error, isMatch);
	});
};

export const User = mongoose.model("User", UserSchema);
