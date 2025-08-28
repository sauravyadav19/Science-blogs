const mongoose = require('mongoose');
const Comment = require('../models/commentModel.js');
const Article = require('../models/articleModel.js');
const { request } = require('express');

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
        return response.redirect(`/article/${articleId}`);
    }catch(error){
        return response.status(500).json({message:`Couldn't delete the Comment ${error}`});
    }

}

exports.createComment = async (request,response) =>{
    try{
        const articleId = request.params.articleId;
        const {body} = request.body || {}; // Creating a fallback in case comment's body is empty
        if(!mongoose.Types.ObjectId.isValid(articleId)){
            return response.status(400).json({message:'Invalid Article Id'});
        }
        if(!await Article.findById(articleId)){
            return response.status(404).json({message:'Article Not Found!'});
        }
        if (!body || body.trim().length === 0) {
            return response.status(400).json({ message: "Comment body cannot be empty" });
        }
        const newComment = new Comment ({
            body: body,
            author:request.user._id,
            article: articleId
        })
        await newComment.save();
        await Article.findByIdAndUpdate(articleId, { $push: { comments: newComment._id } })
        return response.redirect(`/article/${articleId}`);
    }catch(error){
        return response.status(500).json({message:`Comment creation FAILED ${error}`});
    }
}

exports.editComment = async (request,response) =>{
    try{
            const {articleId,commentId} = request.params;
            const {body} = request.body || {};
            if(!mongoose.Types.ObjectId.isValid(articleId)){
                return response.status(400).json({message:'Invalid Article Id'});
            }
            if(!mongoose.Types.ObjectId.isValid(commentId)){
                return response.status(400).json({message:'Invalid comment Id'});
            }
            if(!await Article.findById(articleId)){
                return response.status(400).json({message:'Article not Found'});
            }
            if(!await Comment.findById(commentId)){
                return response.status(400).json({message:'Comment not Found'});
            }
            // Making sure that the comment we are editing does indeed exist on that
            // very article; findOne make sures only and only if all conditions are satisfied
            // it returns a valid document or else it will return NULL
            const comment = await Comment.findOne({
                _id:commentId,
                article:articleId
            });
            if(!comment){
                return response.status(400).json({message:'That comment does not exist on this Article!'});
            }
            if (!body || body.trim().length === 0) {
                return response.status(400).json({ message: "Comment body cannot be empty" });
            }
            await Comment.findByIdAndUpdate(commentId,{$set:{body:body}})

            return response.redirect(`/article/${articleId}`);

        } catch(error){
            return response.status(500).json({message:`Couldn't edit the Comment ${error}`});
        }
}

exports.getComment = async (request,response) =>{
     try{
            const {articleId,commentId} = request.params;
            if(!mongoose.Types.ObjectId.isValid(articleId)){
                return response.status(400).json({message:'Invalid Article Id'});
            }
            if(!mongoose.Types.ObjectId.isValid(commentId)){
                return response.status(400).json({message:'Invalid comment Id'});
            }
            if(!await Article.findById(articleId)){
                return response.status(400).json({message:'Article not Found'});
            }
            if(!await Comment.findById(commentId)){
                return response.status(400).json({message:'Comment not Found'});
            }
            const comment = await Comment.findOne({
                _id:commentId,
                article:articleId
            })
            .populate({path:'author',select:'username'})
            .populate({path:'article',select:'title'});
            
            if(!comment){
                return response.status(400).json({message:'That comment does not exist on this Article!'});
            }
            
            return response.status(200).json({comment});

        } catch(error){
            return response.status(500).json({message:`Couldn't Reterive the Comment ${error}`});
        }
}
