const express = require('express');
const articleRoute = express.Router();
const articleController = require('../controllers/articleControllers.js')

articleRoute.get('/',articleController.getArticle);
articleRoute.get('/:id',articleController.getArticleById);


module.exports = articleRoute;