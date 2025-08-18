const express = require('express');
const Article = require('../models/articleModel.js');
const articleRoute = express.Router();

articleRoute.get('/',(req,res)=>{
    res.send('you are sending this response from Article Route GET Route');
})

module.exports = articleRoute;