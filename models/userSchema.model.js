const mongoose = require("mongoose")


const userSchemas = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  street: {
    type: String,
    required: false
  },
  apartment: {
    type: String,
    required: false,
    default: ''
  },
  city: {
    type: String,
    required: false,
    default: ''
  },
  zip: {
    type: Number,
    default: ''
  },
  country: {
    type: String,
    required: true,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    required: true
  }

})


// Virtualizing the user id, to use _id as normal id.
userSchemas.virtual('id').get(function () {
  return this._id.toHexString();
})

userSchemas.set('toJSON', {
  virtuals: true
})


exports.User = mongoose.model('Users', userSchemas)
exports.userSchemas = userSchema
