const express = require('express');
const articleRoute = express.Router();
const articleController = require('../controllers/articleControllers.js')
const commentRoute = require('../routes/commentRoute.js');

articleRoute.get('/',articleController.getArticle);
articleRoute.get('/createArticle', articleController.createArticleForm)
articleRoute.get('/:id',articleController.getArticleById);

articleRoute.post('/',articleController.createArticle);
articleRoute.patch('/:id',articleController.editArticle)
articleRoute.delete('/:id',articleController.deleteArticle)

articleRoute.use('/:articleId/comments', commentRoute)

module.exports = articleRoute;