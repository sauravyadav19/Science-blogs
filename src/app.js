// Import Express
const express = require('express');
const articleRoute= require('./routes/articleRoute.js')

// Create an Instance of Express
const app = express();
app.use(express.json())
app.use('/article',articleRoute)
//Export the Express Instance
module.exports = app;
