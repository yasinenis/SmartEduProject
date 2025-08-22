import mongoose from 'mongoose';

import slugify from 'slugify';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

CategorySchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next(); // go on for another middleware
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
