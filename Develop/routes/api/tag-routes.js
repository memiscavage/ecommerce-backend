const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try {
  const tags = await Tag.findAll({
    include: [{model: Product}]
  })
  res.status(200).json(tags)
} catch (error) {
  res.status(500).json(error)  
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
try {
  const tag = await Tag.findByPk(req.params.id, {
    include: [{model: Product}]
  })
  if (!tag) {
    return res.status(404).json({message: "No tag found"})
  }
  res.status(200).json(tag)
} catch (error) {
  res.status(500).json(error)
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  } catch (error) {
    res.status(500).json(error)
  }
  });  

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(
    {where: {
      id: req.params.id,
    }}
  );
  res.json(updateTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const newTag = await Tag.destroy({
       where: { id: req.params.id }
      });
    if (!newTag) {
      res.status(404).json({ message: 'No tag with this id found.' });
      return;
      }
      res.status(200).json(newTag);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
