import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET,
			);

			req.user = await User.findById(decoded.id).select(
				'-password',
			);

			next();
		} catch (error) {
			console.error(error);
			res.render('pages/login');
			throw new Error('Not authorized, token failed');
		}
	}

	if (!token) {
		res.render('pages/login');
		throw new Error('Please Login!');
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.render('pages/login');
		throw new Error('Not authorized as an admin');
	}
};

export { protect, admin };
