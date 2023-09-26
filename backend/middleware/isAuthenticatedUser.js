var jwt = require('jsonwebtoken');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const User = require('../models/UserModel');

exports.isAuthenticatedUser = catchAsyncErrors(async(req , res , next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource" , 401));
    }

    const decodedData = jwt.verify(token , process.env.JWT_SECRET);

    // console.log(decodedData);
    // { id: '61d43be3f500bcc87a32aebf', iat: 1641299006, exp: 1641471806 }

    req.user = await User.findById(decodedData.id);

    next();
})

exports.authorizeRoles = (...roles) => {
    return(req , res , next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource` , 403)
            )
        }
        next();
    };
};