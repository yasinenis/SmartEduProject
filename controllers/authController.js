import User from '../models/User.js';

import Category from '../models/Category.js';

import Course from '../models/Course.js';

import bcrypt from 'bcrypt';

import { validationResult } from 'express-validator';

export async function createUser(req, res) {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login');
  } catch (err) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', errors.array()[i].msg);
    }
    res.status(400).redirect('/register');
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // find user from DB
    const user = await User.findOne({ email });

    if (!user) {
      req.flash('error', 'User not found! Please check your email address!');
      return res.status(400).redirect('/login');
    }

    // password control
    const same = await bcrypt.compare(password, user.password);

    if (!same) {
      req.flash('error', 'Your password is not correct');
      return res.status(400).redirect('/login');
    }

    // USER SESSION
    req.session.userID = user._id;

    req.flash('success', 'You are Logged in succesfully.');
    return res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
      stack: err.stack,
    });
  }
}

export async function logoutUser(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

export async function getDashboardPage(req, res) {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  const users = await User.find();
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
    users,
  });
}

export async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Course.deleteMany({ user: req.params.id });

    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
