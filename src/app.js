// Import Express
const express = require('express');
const articleRoute= require('./routes/articleRoute.js')
const userRoute = require('./routes/userRoute.js')
const path = require('path')

// Create an Instance of Express
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views') )
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/article',articleRoute)
app.use('/users', userRoute);

//Export the Express Instance
module.exports = app;
