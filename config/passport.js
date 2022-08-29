import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../model/userModel.js';

export default (passport) => {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email' },
			(email, password, done) => {
				//match user
				User.findOne({ email: email })
					.then((user) => {
						if (!user) {
							return done(null, false, {
								message: 'This email is not registered',
							});
						}
						//match pass
						bcrypt.compare(
							password,
							user.password,
							(err, isMatch) => {
								if (err) throw err;

								if (isMatch) {
									return done(null, user);
								} else {
									return done(null, false, {
										message: 'Password incorrect',
									});
								}
							},
						);
					})
					.catch((err) => {
						console.log(err);
					});
			},
		),
	);
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};
