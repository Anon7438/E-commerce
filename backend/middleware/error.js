const ErrorHandler = require("../utils/eroorhandller")


module.exports =(err, req , res , next) =>{

    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal Server Error";

    //mogodb errors
    if(err.message ==="CastError"){
        const message =     `resource not found Invalid : ${err.path}`;
        err = new ErrorHandler(message, 400);

    }

    res.status(err.statuscode).json({
        success :false,
        message:err.message,
        // error: err,
        // error: err.stack,
    });
};