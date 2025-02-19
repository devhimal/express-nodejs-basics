const router = require("../router")
const User = require("../models/userSchema.model") 

router.get('/', async (req, res) => {
  const userList = await User.find()
  res.status(200).json(userList)

  if (!userList) {
    res.status(500).json({
      error: "Internal error in the server of users",
      success: false
    })
  }
})

