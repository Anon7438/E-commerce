const Product = require("../models/product");
const ErrorHandler = require("../utils/eroorhandller");
const catchAsyncErr = require("../middleware/catchAsyncError");
const ApiFeautres = require("../utils/apiFeautres");
const { query } = require("express");
 

// Create Prooduct 
exports.createProduct = catchAsyncErr(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

//get all products

exports.getAllProducts = catchAsyncErr(async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeautre = new ApiFeautres(Product.find(), req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeautre.query;
  res.status(200).json({ 
     success: true,
     products,
     productCount, });
});



//Update product

exports.updateProduct = catchAsyncErr(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

//Delete Products

exports.deleteProduct = catchAsyncErr(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }
  await Product.deleteOne();
  res.status(200).json({
    success: true,
    message: "product Deleted Sucessfully",
  });
});

//Get product Details

exports.getProductDetails = catchAsyncErr(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }
  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});
