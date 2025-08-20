const mongoose = require('mongoose');
const Comment = require('../models/commentModel.js');
const Article = require('../models/articleModel.js');

exports.getAllComments = async (request,response) =>{
    try{
        console.log("here we are babes!");
        const {articleId} = request.params
        if(!mongoose.Types.ObjectId.isValid(articleId)){
            return response.status(400).json({message:'The Article ID is Invalid'});
        }
        //While Fetching the Article, Populaitng the Comment's body, its author
        const article = await Article.findById(articleId)
                              .populate({
                                path:'comments',
                                select:'body',
                                populate:{path:'author', select:'username'}
                              });
        if(!article){
            return response.status(404).json({messsage:"Article Not Found!"});
        }
        return response.status(200).json(article.comments);

    }catch(error){
        return response.send(error)
    }
}