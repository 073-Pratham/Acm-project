const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/isAuthenticatedUser");


// Create an account 
router.post('/create/account' , catchAsyncErrors(async(req, res , next)=>{
    const { firstName , lastName , email , password , collegeName } = req.body;
    
    const user = await User.create({
        firstName , lastName , email , password , collegeName
    });
    console.log("user", user)

    sendToken(user , 200 , res);
}))

// Login 
router.post('/login' , catchAsyncErrors(async(req, res , next)=>{
    const { email , password } = req.body;
    
    if(!email || !password){
        new ErrorHandler("Please enter the credentials" , 400)
    }
    
    const user = await User.findOne({email}).select('+password');
    
    if(!user){
        return next(new ErrorHandler("Invalid email or password" , 401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password" , 401));
    }
    
    sendToken(user , 201 , res);
}))

// Logout
router.get('/logout' , isAuthenticatedUser , catchAsyncErrors(async(req, res , next)=>{
    
    res.cookie("token" , null , {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    })
}))

// change college name
router.put("/college/change" , isAuthenticatedUser ,  catchAsyncErrors(async(req , res , next)=>{
    
    const user = await User.findById(req.user.id);

    if(!user){
        return next(new ErrorHandler("User not found" , 401));
    }

    const { collegeName } = req.body;

    user.collegeName = collegeName;

    await user.save();

    sendToken(user , 200 , res);
}));


// Change user name
router.put("/change/name" , isAuthenticatedUser ,  catchAsyncErrors(async(req , res , next)=>{
    
    let user = await User.findById(req.user.id);

    if(!user){
        return next(new ErrorHandler("User not found" , 401));
    }

    const userNewData = { 
        firstName:  req.body.firstName, 
        lastName: req.body.lastName 
    };

    console.log("UserData " , userNewData);

    user = await User.findByIdAndUpdate(req.user.id , userNewData , {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    
    await user.save();

    sendToken(user , 200 , res);
}));

// Get Your Details
router.get("/me" , isAuthenticatedUser ,  catchAsyncErrors(async(req , res , next)=>{
    
    const user = await User.findById(req.user.id);

    if(!user){
        return next(new ErrorHandler("User not found" , 401));
    }

    sendToken(user , 200 , res);
}));

// Get single user          --> Admin
router.get("/admin/user/:id" , isAuthenticatedUser , authorizeRoles("admin") ,  catchAsyncErrors(async(req , res , next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User not found" , 401));
    }

    res.status(200).json({
        "success": true,
        user,
    })
}));

module.exports = router;