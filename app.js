import express from 'express';

import mongoose from 'mongoose';

import pageRoute from './routes/pageRoute.js';
import courseRoute from './routes/courseRoute.js';

const app = express();

// Connect DB
mongoose
  .connect('mongodb://127.0.0.1/smartedu-db')
  .then(() => {
    console.log('Database Connected!');
  })
  .catch((err) => {
    console.log(err);
  });

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

app.use(express.json()); // converts url data to json     important these for using req.body
app.use(express.urlencoded({ extended: true })); // helps us to read data in url

// Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
