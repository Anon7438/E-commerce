const ErrorHandler = require("../utils/eroorhandller");
const catchAsyncErr = require("../middleware/catchAsyncError"); 
const User = require("../models/userModels")


//Register User 

exports.registerUser = catchAsyncErr(async(req,res,next)=>{

    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avtar:{
            public_id:"sample_id",
            url:"profile_pic_url"
        }
    });
    res.status(201).json({
        success:true,
        user,
    })
})
