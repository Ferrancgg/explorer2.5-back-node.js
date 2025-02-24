const {Web3}=require("web3")
require("dotenv").config()

const web3=new Web3(process.env.URL_INFURA)
module.exports=web3