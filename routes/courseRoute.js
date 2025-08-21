import express from 'express';

import * as courseController from '../controllers/courseController.js';

const router = express.Router();

router.route('/').post(courseController.createCourse); // localhost:3000/courses
router.route('/').get(courseController.getAllCourses);

export default router;
