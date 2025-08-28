const express = require('express');
const articleRoute = express.Router();
const articleController = require('../controllers/articleControllers.js')
const commentRoute = require('../routes/commentRoute.js');
const {isAuthenticated} = require('../middleware/isAuthenticated.js')
const {isOwner} = require('../middleware/isOwner.js');

articleRoute.get('/',articleController.getArticle);
articleRoute.get('/createArticle', isAuthenticated, articleController.createArticleForm)
articleRoute.get('/:id',articleController.getArticleById);
articleRoute.get('/edit/:id', isAuthenticated,isOwner,articleController.editArticleForm)

articleRoute.post('/',articleController.createArticle);
articleRoute.patch('/:id',articleController.editArticle)
articleRoute.delete('/:id',articleController.deleteArticle)

articleRoute.use('/:articleId/comments', commentRoute)

module.exports = articleRoute;