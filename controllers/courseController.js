import Course from '../models/Course.js';
import Category from '../models/Category.js';

export async function createCourse(req, res) {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });

    res.status(201).redirect('/courses');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function getAllCourses(req, res) {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find();

    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function getCourse(req, res) {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );
    res.status(200).render('course', {
      course,
      page_name: 'courses',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
