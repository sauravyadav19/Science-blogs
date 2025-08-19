const express = require('express');
const articleRoute = express.Router();
const articleController = require('../controllers/articleControllers.js')

articleRoute.get('/',articleController.getArticle);
articleRoute.get('/:id',articleController.getArticleById);
articleRoute.post('/',articleController.createArticle);
articleRoute.patch('/:id',articleController.editArticle)

module.exports = articleRoute;