import Course from '../models/Course.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

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
    const query = req.query.search;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    if (query) {
      filter = { name: query };
    }

    if (!query && !categorySlug) {
      (filter.name = ''), (filter.category = null);
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
      .sort('-createdAt')
      .populate('user');
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
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );
    const categories = await Category.find();
    res.status(200).render('course', {
      course,
      page_name: 'courses',
      user,
      categories,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function enrollCourse(req, res) {
  try {
    const user = await User.findById(req.session.userID);

    await user.courses.addToSet({ _id: req.body.course_id });

    await user.save();
    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function releaseCourse(req, res) {
  try {
    const user = await User.findById(req.session.userID);

    await user.courses.pull({ _id: req.body.course_id });

    await user.save();
    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
