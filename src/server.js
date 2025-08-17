// Import dotenv to support working with Enviroment Variables
const path = require('path')
// Giving the Absoulte Path for our .env file instead of the Default
require('dotenv').config({path:path.join(__dirname,'/../.env')});

//Import Express App
const app = require('./app.js');
const connectDB = require('./config/db.js');

(async () =>{
    try{
        await connectDB();
        app.listen(process.env.PORT,()=>{
            console.log(`App is Listening on the port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.log("---There was an Error (Possibly DB Connection)---");
    }

})();