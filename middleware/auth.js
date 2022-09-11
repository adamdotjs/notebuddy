export const ensureAuth = (req, res, next) => {
	return req.isAuthenticated() ? next() : res.redirect("/");
};
