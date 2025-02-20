// MVC pattern
// Route groups
// Service pattern
// Repository pattern
// User roles
// Working with files
// Rate limiting
// Relational Databases
// OAuth
// Resources: https://dev.to/rhuzaifa/top-5-node-express-boilerplates-for-building-restful-api-s-1ehl

const router = require("../router")
const Category = require('../models/categorySchema.model'); // Import Category model

// GET - Fetch all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res.status(404).json({ error: 'No categories found', success: false });
    }
    res.status(200).json(categories).limit(20);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error while fetching the category', success: false });
  }
});

// POST - Create a new category
router.post('', async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category', success: false });
  }
});

// UPDATE - Updating the data
router.put('/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color
  }, { new: true })

  if (!category) {
    res.status(500).json({ message: "We have not found any category for given id", success: false })
  }

  res.status(200).json(category)
})

// DELETE - Delete a category
router.delete('/:id', (req, res) => {
  Category.findByIdAndDelete(req.params.id).then(category => {
    if (category) {
      return res.status(200).json({ success: true, message: "category is deleted" })
    } else {
      return res.status(404).json({
        success: false,
        message: "category not found"
      })
    }
  }).catch((error) => {
    return res.status(400).json({ success: false, error: error })
  })
})

// GET ONE CATEGORY 
router.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    res.status(500).json({ message: `there is no category for ${id} id.`, success: false })
  }

  res.status(200).send(category)
})

module.exports = router;


// Learn concept of virtual id.
