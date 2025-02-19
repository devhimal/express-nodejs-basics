const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongodb = process.env.MONGODB_CONNECTION_STRING;

const productRouter = require("./routers/product.router")
const categoryRouter = require("./routers/category.router")

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Routes
app.use('/api/products', productRouter);
app.use('/api/products', categoryRouter);

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
