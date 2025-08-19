// Import Express
const express = require('express');
const articleModel = require('./routes/articleRoute.js')

// Create an Instance of Express
const app = express();
app.use(express.json())
app.use('/article',articleModel)
//Export the Express Instance
module.exports = app;
