import express from 'express';

import mongoose from 'mongoose';

import pageRoute from './routes/pageRoute.js';

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

// Routes
app.use('/', pageRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
