const mongoose = require('mongoose')
const Article = require('../models/articleModel');
const User = require('../models/userModel.js')
const Comment = require('../models/commentModel.js');
const { request } = require('express');


exports.getArticle = async (request, response) => {
   try{
      const allArticle = await Article.find().populate('author', 'username');
      return response.status(200).json(allArticle);
   }catch(error) {
      return response.status(500).json({ message: `ERROR ${error}`});
   }
}
exports.getArticleById = async (request, response) => {
   try{
      const id = request.params.id
      // check upfront if ID is valid
      if(!mongoose.Types.ObjectId.isValid(id)) {
         return response.status(400).json({message: 'Invalid article ID'});
      }
      const article = await Article.findById(id)
         .populate('author', 'username email')
         .populate({
            path: 'comments',
            select: 'body',
            populate: {
               path: 'author',
               select: 'username'
            }
         });
      if(!article) {
         return response.status(404).json({message: "There is no such Article"});
      } else {
         return response.status(200).json(article);
      }
   }catch(error) {
      return response.status(500).json({message: `ERROR ${error}`});
   }
}
exports.createArticle = async (request, response) => {
   try{
      const {title,body,author} = request.body;
      const newArticle = new Article({
         title: title,
         body: body,
         author: author
      })
      await newArticle.save()
      return response.json({message: "The post has been successfully created"});
   }catch(error) {
      response.json(`Error ${error}`)
   }
}
exports.editArticle = async (request, response) => {
   try {
         const id = request.params.id;
         const { title, body, author } = request.body;

         if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ message: 'Invalid Article ID' });
         }

         const article = await Article.findByIdAndUpdate(
            id,
            { $set: { body: body, title: title, author: author } },
            { new: true, runValidators: true }
         );
         // by default mongo return the old doucment setting new to true allows for the
         // will ask it to send the updated version
         // and we are re-running the validators so our schema's integrity is maintained

         if (!article) {
            return response.status(404).json({ message: 'Article Not Found!' });
         }

         return response.json({
            message: 'all Changes are successfully saved',
            article
         });

   } catch (error) {
         return response.status(500).json({ message: `Error ${error}` });
   }
};

//To-do (implement Delete for article)
   // for that we need to write a controller for deleting comments
   // that way when a post is deleted all the comments on it also gets deleted
