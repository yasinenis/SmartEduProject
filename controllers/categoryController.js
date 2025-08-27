import Category from '../models/Category.js';

export async function createCategory(req, res) {
  try {
    const category = await Category.create(req.body);

    res.status(201).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}

export async function deleteCategory(req, res) {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
}
