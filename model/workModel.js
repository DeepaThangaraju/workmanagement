import mongoose from "mongoose";


const workSchema=new mongoose.Schema({
  work:{
      type:String,
      required:[true,"please Enter the work"],
      maxlength:30,
  },
  workLocation:{
    type:String,
    required:[true,"please Enter the location"],
    default:'my city',
  },
  status:{
    type:String,
    enum:["pending","finished"],
    default:"pending"
  },
  workType:{
    type:String,
    enum:["important","unimportant","moderate"],
    default:"important" 
  },
  createdBy:{
      type:mongoose.Types.ObjectId,
      ref:'userModel',
      required:[true,"Please provide user"]
  }
},{
    timestamps:true
})

export const workModel=mongoose.model('work',workSchema)