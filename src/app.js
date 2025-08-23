// Import Express
const express = require('express');
const articleRoute= require('./routes/articleRoute.js')
const userRoute = require('./routes/userRoute.js')

// Create an Instance of Express
const app = express();
app.use(express.json())
app.use('/article',articleRoute)
app.use('/users', userRoute);

//Export the Express Instance
module.exports = app;
