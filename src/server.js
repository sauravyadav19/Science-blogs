// Import dotenv to support working with Enviroment Variables
require('dotenv').config();

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