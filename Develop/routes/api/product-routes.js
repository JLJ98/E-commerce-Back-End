const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Product successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map(tag_id => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    const resultProduct = await Product.findByPk(product.id, {
      include: [{ model: Tag, through: ProductTag }],
    });
    
    res.status(200).json(resultProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
    },
  });

  let updatedProduct = await Product.findByPk(req.params.id, {
    include: [{ model: Tag, through: ProductTag }],
  });

  if (req.body.tagIds) {
    const existingTagIds = updatedProduct.Tags.map((tag) => tag.id);
    const newTagIds = req.body.tagIds;
    const newTagsToAdd = newTagIds.filter((id) => !existingTagIds.includes(id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
    const tagsToRemove = existingTagIds.filter((id) => !newTagIds.includes(id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

    await ProductTag.destroy({ where: { tag_id: tagsToRemove.map(t => t.tag_id) } });
    await ProductTag.bulkCreate(newTagsToAdd);
  }

  updatedProduct = await Product.findByPk(req.params.id, {
    include: [{ model: Tag, through: ProductTag }],
  });

  res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
