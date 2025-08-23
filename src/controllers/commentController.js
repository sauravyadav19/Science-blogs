const mongoose = require('mongoose');
const Comment = require('../models/commentModel.js');
const Article = require('../models/articleModel.js');

exports.getAllComments = async (request,response) =>{
    try{
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

exports.deleteComment = async(request,response) => {
    try{
        const articleId = request.params.articleId;
        const commentId = request.params.commentId;
        if(!mongoose.Types.ObjectId.isValid(articleId)){
            return response.status(400).json({message:"The Article Id is invalid"})
        }
        if(!mongoose.Types.ObjectId.isValid(commentId)){
            return response.status(400).json({message:"The Comment Id is invalid"})
        }
        const deletedComment = await Comment.findByIdAndDelete(commentId)
        if(!deletedComment){
            return response.status(404).json({message:'Comment Not Found'});
        }
        // $ pull removes all occurence of an element with whom the condition matches
        // so whereever in our comment array commentsId matches(in our case just once)
        // its instance will be removed
        await Article.findByIdAndUpdate(articleId,{$pull:{comments:commentId}});
        return response.status(200).json({message:'Comment Deleted successfully'});
    }catch(error){
        return response.status(500).json({message:`Couldn't delete the Comment ${error}`});
    }

}