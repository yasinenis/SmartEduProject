import Course from '../models/Course.js';

export async function createCourse(req, res) {
  const course = await Course.create(req.body);
  try {
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
