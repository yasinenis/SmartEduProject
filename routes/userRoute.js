import express from 'express';

import * as authController from '../controllers/authController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

import { body } from 'express-validator';

import User from '../models/User.js';

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name.'),
    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email.')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('E-Mail is already exists!');
          }
        });
      }),
    body('password').not().isEmpty().withMessage('Please Enter A Password'),
  ],
  authController.createUser
); // localhost:3000/users/signup
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUser);

export default router;
