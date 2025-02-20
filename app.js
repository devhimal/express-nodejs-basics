const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongodb = process.env.MONGODB_CONNECTION_STRING;
const authJwt = require("./helpers/jwt")
const errorHandler = require("./helpers/error.handler")

const productRouter = require("./routers/product.router")
const categoryRouter = require("./routers/category.router")
const userRouter = require("./routers/users.router")


// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());

// handling the server error
app.use(errorHandler)

// Routes
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter)

// Connect to MongoDB
mongoose.connect(mongodb)
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
