const ErrorHandler = require("../utils/eroorhandller");
const catchAsyncErrors = require("./catchAsyncError");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");



exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login to view content ", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData._id);
  console.log("user printed " , req.user)

  next();
});


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        console.log(req.user.role)
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed for this resource `,
          403
        )
      );
    }
    next();
  }
};
