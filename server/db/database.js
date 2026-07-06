const mongoose=require("mongoose")

mongoose.set('strictQuery', false)
const connectdb=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then((data)=>{
        console.log(`mongo db connected with:${data.connection.host}`)
    })
}

module.exports=connectdb;