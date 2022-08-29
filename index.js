import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport'
import passportConfig from './config/passport.js';

import connectDB from './config/db.js';

passportConfig(passport);

dotenv.config();

//Connect mongoDB
connectDB();

//Import Routes
import userRoutes from './routes/userRoutes.js';
import indexRoutes from './routes/indexRoutes.js'
import blogRoutes from './routes/blogRoutes.js'

// Initialize express
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

const __dirname = path.resolve();
app.use(
	'/',
	express.static(path.join(__dirname, '/public')),
);

//express session
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	}),
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', indexRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);


const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
			.yellow.bold.underline,
	),
);