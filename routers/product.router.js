const express = require("express")
const router = express.Router()
const Product = require("../models/productSchema.model")
const Category = require("../models/categorySchema.model")
const mongoose = require("mongoose")

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)

  } catch (error) {
    res.status(500).json({ error: "Internal server error", success: false })
  }
})

// getting individual data with id
router.get('/:id', async (req, res) => {
  try {
    const products = await Product.findById(req.params.id).populate('category')
    res.status(200).json(products)

  } catch (error) {
    res.status(500).json({ error: "Internal server error", success: false })
  }
})

// posting data into mongodb
router.post('/', async (req, res) => {
  const category = await Category.findById(req.body.category)
  if (!category) return res.status(500).json({ message: "Invalid category, Please add valid category.", success: false })

  let products = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countStock: req.body.countStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated
  })

  products = await products.save()

  if (!products) {
    return res.status(500).send("Internal server error")
  }

  res.send(products)

})

// updating the product based on id
router.put('/:id', async (req, res) => {

  // we are validating the product id before updating the product if product id is valid, we procceed to next process if not, return the error message in the server.
  if (mongoose.isValidObjectId(req.params.id)) {
    res.status(500).send(`Invalid product id: ${req.params.id}`)
  }

  const category = await Category.findById(req.body.category)
  if (!category) return res.status(500).json({ message: "Invalid category, Please add valid category.", success: false })

  // updating the product
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countStock: req.body.countStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated
  }, { new: true })

  if (!product) {
    return res.status(500).json({
      message: "the product can not be updated",
      success: false
    })
  }

  res.send(product)
})


// DELETE - deleting the product based on it.
router.delete('/:id', (req, res) => {

  if (mongoose.isValidObjectId(req.params.id)) {
    res.status(500).json({
      message: `Invalid product id: ${req.params.id}`
    })
  }

  Product.findByIdAndDelete(req.params.id).then(product => {
    if (product) {
      return res.status(200).json({ success: true, message: "you have successfully deleted the product.", product: product })
    }
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: "You can not delete the product",
      error: error
    })
  })
})

// FEATURED PRODUCT - getting the featured products.
router.get('/get/featured/:count', async (req, res) => {
  const count = req.params.count ? req.params.count : 0
  const featuredProduct = await Product.find({ isFeatured: true }).limit(+count) // here + operator convert it as number

  if (!featuredProduct) {
    res.status(500).json({ success: false })
  }

  res.send(featuredProduct)
})


// QUERY PARAMETERS
router.get('/get/filtered', async (req, res) => {
  let filter = {}
  if (req.query.category) {
    filter = {
      category: req.query.category.split(',')
    }
  }

  const productList = await Product.find(filter).populate('category')
  if (!productList) {
    res.status(500).json({ success: false, message: "Internal server error" })
  }

  res.send(productList)

})


module.exports = router;
