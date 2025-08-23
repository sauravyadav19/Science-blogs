const express = require('express');
// Since in this routes, we need to get the article id from params
// as the url would look like this /:articleId/comments
// and we want to access that `articleId` in comments we have to pass this mergeParams options as true
const commentRoute = express.Router({mergeParams:true});
const commentController = require('../controllers/commentController.js')


commentRoute.get('/', commentController.getAllComments);
commentRoute.delete('/:commentId',commentController.deleteComment);

module.exports = commentRoute;