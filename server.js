import express from "express"
import dotenv from "dotenv"
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandler from "./middleware/error-handler.js"
import connectDb from "./db/connect.js"
import { authRouter } from "./routes/authRoute.js"
import { workRouter } from "./routes/workRoute.js"
import cors from "cors"
import morgan from "morgan"


const app=express()
dotenv.config()
app.use(cors())
app.use(express.json())

//middleware
if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

app.get("/",(req,res)=>{
    res.json({msg:"Hello World!!!"})
})
app.get("/api",(req,res)=>{
    res.json({msg:"API"})
})

app.use("/api/auth",authRouter)
app.use("/api/works",workRouter)

app.use(notFoundMiddleware)
app.use(errorHandler)


const PORT=process.env.PORT || 5000

const start=async ()=>{
try{
await connectDb(process.env.MONGO_URL)
app.listen(PORT,()=>console.log("App running on the port",PORT))
}catch(err){
    console.log(err)
}
}

start()