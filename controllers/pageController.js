import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import Course from '../models/Course.js';
import User from '../models/User.js';

dotenv.config();

export async function getIndexPage(req, res) {
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.find().countDocuments({ role: 'student' });
  const totalTeachers = await User.find().countDocuments({ role: 'teacher' });

  console.log(req.session.userID);
  res.status(200).render('index', {
    page_name: 'index',
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
}

export async function getAboutPage(req, res) {
  res.status(200).render('about', {
    page_name: 'about',
  });
}

export async function getRegisterPage(req, res) {
  res.status(200).render('register', {
    page_name: 'register',
  });
}

export async function getLoginPage(req, res) {
  res.status(200).render('login', {
    page_name: 'login',
  });
}

export async function getContactPage(req, res) {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
}

export async function sendEmail(req, res) {
  try {
    const outputMessage = `
  <h3>Mail Details </h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email} </li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL, // gmail account
        pass: process.env.APP_PASS, // gmail password
      },
    });

    let info = await transporter.sendMail({
      from: `"SMART EDU Contact Form" <${process.env.MAIL}>`, // sender address
      to: process.env.MAIL,
      replyTo: `${req.body.email}`,
      subject: 'SMART EDU Contact Form New Message',
      html: outputMessage,
    });

    req.flash('success', 'We received your message succesfully.');

    res.status(200).redirect('contact');
  } catch (error) {
    req.flash('error', `Something went wrong! ${error}`);
    res.status(200).redirect('contact');
  }
}
