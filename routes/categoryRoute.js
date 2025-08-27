import express from 'express';

import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

router.route('/').post(categoryController.createCategory); // localhost:3000/categories
router.route('/:id').delete(categoryController.deleteCategory);

export default router;
