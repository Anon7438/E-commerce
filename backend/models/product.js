const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name "],
    trim: true,
  },
  discription: {
    type: String,
    required: [true, "Please Enter Product discription "],
  },
  price: {
    type: String,
    required: [true, "Please Enter Product price "],
    maxlength: [8, "price can not exceed 8 character"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Product stock "],
    maxlength: [4, "stock can not exceed 4 digits"],
    default: 1,
  },
  numOfReiviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
