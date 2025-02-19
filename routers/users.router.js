const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.model")
const bcrypt = require("bcryptjs")
const mongoose = require('mongoose')
// GET - Fetch all users
router.get("", async (req, res) => {
  try {
    const userList = await User.find().select('-passwordHash'); // Fetch user list or incase if we need to fetch only name, email, or any collection fields we can pass name, email. phone without adding - sign.

    if (!userList || userList.length === 0) {
      return res.status(404).json({
        message: "No users found",
        success: false,
      });
    }

    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error while fetching users",
      success: false,
      details: error.message,
    });
  }
});

// POST - Create a new user
router.post("", async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      isAdmin: req.body.isAdmin,
    });

    user = await user.save();

    if (!user) {
      return res.status(400).json({ message: "Error creating user", success: false });
    }

    res.status(201).json(user); // Use 201 status for created resource
  } catch (error) {
    res.status(500).json({
      error: "Internal server error while creating user",
      success: false,
      details: error.message, // Optional: Helps in debugging
    });
  }
});

// UPDATE - updating the user data
router.put('/:id', async (req, res) => {

  // if (mongoose.isValidObjectId(req.params.id)) {
  //   return res.status(500).json({ success: false, message: `Invalid user id: ${req.params.id}` })
  // }

  try {

    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.passwordHash,
      phone: req.body.phone,
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      isAdmin: req.body.isAdmin,
    }, {
      new: true
    })

    if (!user) {
      res.status(500).json({
        error: "We have not found any user details for give id",
        success: false,
        userId: `${req.params.id}`
      })
    }

    res.status(200).json(
      {
        success: `You have successfully updated the ${req.params.id} id's user data`,
        user //user:user
      }
    )

  } catch (error) {
    res.status(500).json({
      error: "Internal server error while udpating the user.",
      success: false,
      details: error.message
    })
  }

})

// DELETE - deleting the users from the databse
router.delete('/:id', async (req, res) => {
  User.findByIdAndDelete(req.params.id).then(user => {
    if (!user) {
      res.status(404).json({
        message: "User not found for the given userId",
        success: false
      })
    }
    res.status(200).json({
      message: "you have successfully deleted the user",
      success: true
    })
  }).catch((error) => {
    res.status(500).json({
      message: "Internal server error",
      success: false
    })
  })
})


// GET SINGLE USER
router.get("/:id", async (req, res) => {
  // this line will validate if the user with id is available or not before proceeding to further.
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(500).json({ message: "Invalid user id while geting the single user." })
  }
  const user = await User.findById(req.params.id).select('-passwordHash')
  res.status(200).json({
    message: "You have successfull fetched user data: ",
    user
  })
})

module.exports = router; 
