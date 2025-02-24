const { getLastBlock, getInfoBlock, getInfoCounter } = require("../controller/explorerEth")

const indexRouter=require("express").Router()
indexRouter.use("/last",getLastBlock)
indexRouter.use("/block/:block",getInfoBlock)


module.exports=indexRouter

