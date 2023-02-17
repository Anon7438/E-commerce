const ErrorHandler = require("../utils/eroorhandller");
const catchAsyncErr = require("../middleware/catchAsyncError"); 
const User = require("../models/userModels")
const sendToken = require("../utils/jwtToken")


//Register User 

exports.registerUser = catchAsyncErr(async(req,res,next)=>{

    const {name,email,password } = req.body;
    const user = await User.create({
        name,email,password,
        avtar:{
            public_id:"sample_id",
            url:"profile_pic_url"
        }
    });

    sendToken(user,201,res)
})

//Login user 
exports.loginUser = catchAsyncErr(async(req,res,next)=>{


    const {email , password} = req.body;

    // checking user have given email and password both or not 

    if(!email|| !password){

        return next(new ErrorHandler("please Enter email and password ", 400));

    }
    const user = await User.findOne({ email: email }).select("+password");

    if(!user){

        return next(new ErrorHandler("Invalid email or password  ", 401));        
    }
    
    const  isPasswordMatched = user.comparePassword(password);
    
    if(!isPasswordMatched){

        return next(new ErrorHandler("Invalid or password  ", 401));        
    }

    sendToken(user,200,res)
  
});



//Logout User 
exports.logoutUser = catchAsyncErr(async(req,res,next)=>{

        res.cookie("token",null,{
            expires :new Date(Date.now()),
            httpOnly :true,
        })


        res.status(200).json({
            sucess:true,
            message :"Loged Out sucssfully "
        });
});    