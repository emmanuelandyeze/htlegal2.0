import express from 'express';
const router = express.Router();
import { getBlogs, getSingleBlog, postBlog } from '../controllers/blogControllers.js';

router.route('/').get(getBlogs).post(postBlog)
router.route('/:id').get(getSingleBlog)

export default router;