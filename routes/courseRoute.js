import express from 'express';

import * as courseController from '../controllers/courseController.js';

import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(roleMiddleware(['teacher', 'admin']), courseController.createCourse); // localhost:3000/courses
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);

export default router;
