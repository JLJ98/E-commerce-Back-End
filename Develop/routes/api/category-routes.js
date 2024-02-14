const router = require('express').Router();
const { Category, Product } = require('../../models');

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData[0]) {  // Check if the update was successful
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully!' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
  const categoryIdToDelete = req.params.id;

  try {
    // Check for any products associated with this category
    const products = await Product.findAll({ where: { category_id: categoryIdToDelete } });

    if (products.length > 0) {
      // If there are associated products, prevent deletion
      res.status(400).json({ message: 'Cannot delete category because it has products associated with it.' });
      return;
    }

    // If no associated products, proceed with deletion
    const categoryData = await Category.destroy({ where: { id: categoryIdToDelete } });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Category successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting category', error: err });
  }
});




module.exports = router;
