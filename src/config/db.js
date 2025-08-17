const mongoose = require('mongoose')


const connectDB  = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connection with Database has been established');
    }
    catch(error){
        console.log("An Error Occured");
        console.log(error);
    }

}
module.exports = connectDB;