import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide name"],
        minlength:3,
        maxlength:20,
        trim:true,
    },
    email:{
        type:String,
        required:[true,"please provide email"],
        validate:{
          validator:validator.isEmail,
          message:"please Provide a valid email"
        },
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide Password"],
        minlength:6,
        select:false
    },
    location:{
        type:String,
        trim:true,
        maxlength:20,
        default:'my city'
    },
    lastName:{
        type:String,
        trim:true,
        maxlength:20,
        default:'lastname'
    },
})

userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT=function(){
    return jwt.sign({userId:this._id},process.env.JWT_KEY,{expiresIn:process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword=async function(candidatePassword){
    const isMatch=await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

export const userModel=mongoose.model("user",userSchema)