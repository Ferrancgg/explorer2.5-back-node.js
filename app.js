console.log("en marcha y adelante")
const express=require("express")
const { setError } = require("./src/config/error")
const indexRouter = require("./src/api/routes/indexRouter")
const cors=require("cors")
const limiter = require("./src/middlewares/rateLimiter")
const app=express()
const PORT=4000
app.use(express.json())
app.use(limiter)
app.use(cors())
app.use("/explorer",indexRouter)


app.use("*",(req,res,next)=>{
    return next (setError(404,"not found"))
   
})
app.use((error,req,res,next)=>{
    return res.status(error.status||500).json(error.message||"internal server error")
})
app.listen(PORT,()=>{console.log(`listen port http://localhost:${PORT}`)})