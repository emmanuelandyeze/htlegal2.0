import express from 'express';
const router = express.Router();
import User from '../model/userModel.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

//login handle
router.get('/login', (req, res) => {
	res.render('pages/login');
});

router.get('/register', (req, res) => {
	res.render('register');
});

//Register handle
router.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	let errors = [];
	if (!name || !email || !password) {
		errors.push({ msg: 'Please fill in all fields' });
	}
	//check if password is more than 6 characters
	if (password.length < 6) {
		errors.push({
			msg: 'Password must be at least 6 characters',
		});
	}
	if (errors.length > 0) {
		res.render('register', {
			errors: errors,
			name: name,
			email: email,
			password: password,
		});
	} else {
		//validation passed
		User.findOne({ email: email }).exec((err, user) => {
			if (user) {
				res.json('User already registered')
			} else {
				const newUser = new User({
					name: name,
					email: email,
					password: password,
				});
				bcrypt.genSalt(10, (err, salt) =>
					bcrypt.hash(
						newUser.password,
						salt,
						(err, hash) => {
							if (err) throw err;
							//save pass to hash
							newUser.password = hash;
							//save user
							newUser
								.save()
								.then((value) => {
									res.redirect('/api/users/login');
								})
								.catch((value) => console.log(value));
						},
					),
				);
			}
		});
	}
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/admin',
		failureRedirect: 'api/users/login',
		// failureFlash: true,
	})(req, res, next);
});

//logout
router.post('/logout', function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});

export default router;
