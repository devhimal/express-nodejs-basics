const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
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
    required: true,
    default: null
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
    default: null
  },
  country: {
    type: String,
    required: true,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }

})


// Virtualizing the user id, to use _id as normal id.
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
})

userSchema.set('toJSON', {
  virtuals: true
})

const User = mongoose.model('User', userSchema)
module.exports = User
