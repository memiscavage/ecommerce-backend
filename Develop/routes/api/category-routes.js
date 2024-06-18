const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!category) {
      return res.status(404).json({ message: "No category found" })
    }
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory)
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body,
      {
        where: { id: req.params.id, }
      }
    );
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No category with this id found.' });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json(error);
  }
}),

  router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
      const newCategory = await Category.destroy({
        where: { id: req.params.id }
      });
      if (!newCategory) {
        res.status(404).json({ message: 'No category with this id found.' });
        return;
      }
      res.status(200).json(newCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
