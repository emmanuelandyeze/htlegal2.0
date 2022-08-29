import Blog from '../model/blogModel.js'
// @desc    Get blogs page
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
	res.render('pages/blogs', {blogs});
};

// @desc    Get single blog page
// @route   GET /api/blogs/:id
// @access  Public
const getSingleBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
	res.render('pages/singleBlog', {blog});
};

// @desc    Post blog
// @route   POST /api/blogs
// @access  Private
const postBlog = async (req, res) => {
	const blog = await Blog.create(req.body);

	const createdBlog = await blog.save();
	res.send('<script>alert("Blog Successfully Uploaded... Check your blogs page!")</script>')
};

export { getBlogs, getSingleBlog, postBlog };
