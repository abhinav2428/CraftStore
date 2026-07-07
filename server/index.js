const app=require("./app");
const connectdb = require("./db/database");

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log("shutting down server");
})

if(process.env.NODE_ENV!== "PRODUCTION"){
    require("dotenv").config({
        path:"./config/.env"
    })
}


connectdb();
const server=app.listen(process.env.PORT,()=>{
    console.log(`sERVER IS RUNNING ON PORT:${process.env.PORT}`)
})

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`)
    console.log("shutting down server");
    server.close(()=>{
        process.exit(1)
    })
})