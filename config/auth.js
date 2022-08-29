const ensureAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/api/users/login');
};

export default ensureAuthenticated;
