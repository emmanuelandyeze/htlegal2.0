import express from 'express';
import { getAdmin, getIndex } from '../controllers/indexController.js';
import ensureAuthenticated from '../config/auth.js';
const router = express.Router();
import {
	protect,
	admin,
} from '../middlewares/authMiddleware.js';

router.route('/').get(getIndex)
router.route('/admin').get(ensureAuthenticated, getAdmin)

export default router;