import { userModel } from "../model/userModel.js";
import { StatusCodes } from "http-status-codes";
import {BadRequestError,unAuthunticatedError} from "../errors/index.js"

const register=async (req,res,next)=>{
    const {name,email,password}=req.body
    
   try{
    if(!name || !email || !password){
        throw new BadRequestError("Please Enter all values ")
    }
    const userAlreadyExist=await userModel.findOne({email})
    if(userAlreadyExist){
        throw new BadRequestError("Invalid Credentials")
    }
      const user=await userModel.create({name,email,password})
      const token=user.createJWT()
      res.status(StatusCodes.CREATED).json({user:{
          email:user.email,
          name:user.name,
          lastName:user.lastName,
          location:user.location
      },token,location:user.location})
   }catch(err){
    next(err)
   }
}

const login=async (req,res,next)=>{
   const {email,password}=req.body
   try{
    if(!email || !password){
        throw new BadRequestError("Please Enter all values ")
    }
    const user=await userModel.findOne({email}).select('+password')

    if(!user){
        throw new unAuthunticatedError("Invalid Credentials")
    }

    const isPasswordCorrect=await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new unAuthunticatedError("Invalid Credentials")
    }

    const token=user.createJWT()
    user.password=undefined
    return res.status(StatusCodes.OK).json({user,token,location:user.location})
   }catch(err){
    next(err)
   }
   
}

const updateUser=async (req,res,next)=>{
   
    
   const {name,email,lastName,location}=req.body;
   try{
   if(!email || !name || !lastName || !location){
       throw new BadRequestError("Please provide all info")
   }

   const user=await userModel.findOne({_id:req.user.userId})
   
   console.log(user)

   user.name=name,
   user.email=email,
   user.lastName=lastName,
   user.location=location
  
   await user.save()
   const token=user.createJWT()

   res.status(StatusCodes.OK).json({user,token,location:user.location})
}catch(err){
    next(err)
}



}

export {register,login,updateUser}