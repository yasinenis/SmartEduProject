import Course from '../models/Course.js';

export async function createCourse(req, res) {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function getAllCourses(req, res) {
  try {
    const courses = await Course.find();
    res.status(200).render('courses', {
      courses,
      page_name: 'courses',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
