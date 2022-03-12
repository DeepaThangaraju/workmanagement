import { workModel } from "../model/workModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermission from "../utils/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment"

const createWork = async (req, res,next) => {
  const { work } = req.body;
  try{
  if (!work) {
    throw new BadRequestError("Please Provide work");
  }

  req.body.createdBy = req.user.userId;

  const workCreate = await workModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ workCreate });
}catch(err){
  next(err)
}

};

const deleteWork = async (req, res,next) => {
  const {id:workId}=req.params;
  try{
    const work=await workModel.findOne({_id:workId})
    if(!work){
      throw new NotFoundError(`No Work found ${workId}`)
    }
    checkPermission(req.user,work.createdBy)

    await work.remove()
    res.status(StatusCodes.OK).json({msg:"success!! work removed"})
  }catch(err){
   next(err)
  }
};

const getAllWork = async (req, res) => {
  const { status, workType, sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (workType && workType !== 'all') {
    queryObject.workType = workType
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = workModel.find(queryObject)

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const works = await result

  const totalwork= await workModel.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalwork / limit)

  res.status(StatusCodes.OK).json({ works, totalwork, numOfPages })
};

const updateWork = async (req, res,next) => {
  const {id:workId}=req.params;
  const { work }=req.body
  try{
     if(! work){
       throw new BadRequestError("Please provide information")
     }
     const workfind=await workModel.findOne({_id:workId})
  if(!workfind){
    throw new NotFoundError(`No job with id ${workId}`)
  }

  //check permission
  // console.log(typeof req.user.userId)
  // console.log(typeof workfind.createdBy)

  checkPermission(req.user,workfind.createdBy)

  const updatedWork=await workModel.findOneAndUpdate({_id:workId},req.body,{
    new:true,
    runValidators:true,
  })

  res.status(StatusCodes.OK).json({ updatedWork });
  }catch(err){
    next(err)
  }
};

const showStats = async (req, res) => {
 let stats=await workModel.aggregate([
   {$match:{createdBy:mongoose.Types.ObjectId(req.user.userId)}},
   {$group:{_id:'$status',count:{$sum:1}}
  }
 ])

 stats=stats.reduce((acc,curr)=>{
   const {_id:title,count}=curr
   acc[title]=count
   return acc
 },{})

 const defaultStats={
   pending:stats.pending || 0,
   finished:stats.finished || 0
 }

let monthlyWork=await workModel.aggregate([
  {$match:{createdBy:mongoose.Types.ObjectId(req.user.userId)}},
  {
    $group:{
      _id:{
        year:{
          $year:'$createdAt'
        },
        month:{
          $month:'$createdAt'
        },
      },
      count:{$sum: 1}
    },
  },
  {
    $sort:{'_id.year':-1,'_id.month':-1}
  },
    {$limit: 6}
])

monthlyWork=monthlyWork.map((item)=>{
  const {_id:{year,month},count,}=item

  const date=moment().month(month -1).year(year).format('MMM Y')

  return {date,count}
}).reverse()

 res.status(StatusCodes.OK).json({ monthlyWork ,defaultStats });
};

export { createWork, deleteWork, getAllWork, updateWork, showStats };
