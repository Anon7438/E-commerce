const mongoose = require("mongoose");
const validator = require ("validator");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Please enter your name "],
        maxlength:[30, "Name can not exceed 30 character "],
        minlength:[4,"Name should have minimum 4 character "],
    },
    email:{
        type:String,
        required:[true, "Please enter your email "],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email "]
        
        },
    password:{
        type:String,
        required:[true, "Please enter your password "],
        unique:true,
        minlength:[8,"Name should be grater than 4 character "],
        select:false
        
        },
        avtar:{
              public_id: {
                type: String,
                required: true,
              },
              url: {
                type: String,
                required: true,
              }
            },
        role:{
            type: String,
            default:"user"
        },
        resetPasswordToken:String,    
        resetPasswordExpire:Date,    

});

module.exports = mongoose.model("User", userSchema);