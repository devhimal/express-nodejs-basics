function errorHandler(err, req, res, next) {

  // here we can specify what kind of message you would like to give 
  //for the certail errors: like if you like to give a specific error message
  // for authentication and permission error you could write it here, just by 
  // checking if err.name ==  "AuthorizationError"
  if (err.name == "UnauthorizedError") {
    return res.status(500).json({
      message: "You are not authorized to access it.",
      error: err
    })
  }
  else {
    return next(res.status(500).json({
      message: "Server error",
      error: err
    }))
  }
}


module.exports = errorHandler
