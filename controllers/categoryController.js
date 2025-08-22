import Category from '../models/Category.js';

export async function createCategory(req, res) {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      status: 'success',
      category,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
