const express = require('express');
const Article = require('../models/articleModel.js');
const User = require('../models/userModel.js');
const articleRoute = express.Router();

articleRoute.get('/',async(req,res)=>{
    const allArticles = await Article.find().populate('author');
    res.send(allArticles);
})

module.exports = articleRoute;