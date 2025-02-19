const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.model")
const bcrypt = require("bcryptjs")
// GET - Fetch all users
router.get("", async (req, res) => {
  try {
    const userList = await User.find(); // Fetch user list

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

module.exports = router; 
