import User from '../models/User.js';

import bcrypt from 'bcrypt';

export async function createUser(req, res) {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // find user from DB
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'User not found' });
    }

    // password control
    const same = bcrypt.compare(password, user.password);

    if (!same) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Incorrect password' });
    }

    // USER SESSION
    req.session.userID = user._id;

    res.status(200).redirect('/users/dashboard');
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
  const user = await User.findOne({ _id: req.session.userID });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
  });
}
