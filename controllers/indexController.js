import Blog from "../model/blogModel.js";

// @desc    Get index page
// @route   GET /
// @access  Public
const getIndex = async (req, res) => {
	const blogs = await Blog.find().sort({ createdAt: -1 });
	res.render('pages/home', {blogs})
};

// @desc    Get Admin page
// @route   GET /admin
// @access  Public
const getAdmin = async (req, res) => {
	const blogs = await Blog.find().sort({ createdAt: -1 });
	res.render('pages/admin', { blogs, user: req.user })
};


export { getIndex, getAdmin };