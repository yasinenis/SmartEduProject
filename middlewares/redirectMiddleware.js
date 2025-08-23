import User from '../models/User.js';

export default async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userID);
    if (user) return res.redirect('/');
    next();
  } catch (err) {
    return res.redirect('/');
  }
};
