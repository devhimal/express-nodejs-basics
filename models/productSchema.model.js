const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  richDescription: {
    type: String,
    default: ''
  },
  image: [{
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/[^\s]+/.test(v); // Basic URL validation
      },
      message: props => `${props.value} is not a valid URL!`
    }
  }],
  brand: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  countStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
