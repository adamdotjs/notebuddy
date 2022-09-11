export const ensureAuth = (req, res, next) => {
	return req.isAuthenticated() ? next() : res.redirect("/");
};

export const redirectIfUser = (req, res, next) => {
	return req.isAuthenticated() ? res.redirect("/notes") : next();
};
