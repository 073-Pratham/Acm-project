const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
var jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: [true , "Please enter the name"],
        maxlength: [20 , "First Name Length should be less than 20 characters"],
        minlength: [2 , "First Name Length should be greater than 2 characters"]
    },
    lastName:{
        type: String,
        required: [true , "Please enter the name"],
        maxlength: [20 , "Last Name Length should be less than 20 characters"],
        minlength: [2 , "Last Name Length should be greater than 2 characters"]
    },
    email:{
        type: String,
        required: [true , "Please enter the email"],
        unique: true,
        validate: [validator.isEmail , "Please enter a valid email"]
    },
    password:{
        type: "String",
        required: [true , "Please enter a password"],
        minlength: [],
        select: false,
    },
    collegeName:{
        type: String,
        required: [true , "Please enter your college name"],
    },
    role:{
        type: String,
        default: "user",
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Here we can use arrow function but In arrow function we cannot use "this."
UserSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password , 10);
})

// JWT TOKEN
UserSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id} , process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

// Compare Password
UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

const user = mongoose.model('User' , UserSchema);
module.exports = user;