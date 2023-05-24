const mongoose=require('mongoose');

mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected",(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("db connected");
    }
})
