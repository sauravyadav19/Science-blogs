const mongoose = require('mongoose')
const Article = require('../models/articleModel');
const User = require('../models/userModel.js')
const Comment = require('../models/commentModel.js');

exports.getArticle = async (request, response) => {
  try {
    const requestedSortingOrder = request.query.sortingOrder === 'asc' ? 'asc' : 'dsc';
    const sortingOrder  = requestedSortingOrder === 'asc' ? 1 : -1;

    const allArticle = await Article.find()
      .sort({ createdAt: sortingOrder })
      .populate('author', 'username');

    const nextSortingOrder = requestedSortingOrder === 'asc' ? 'dsc' : 'asc';

    // ✅ Labels
    const currentOrderLabel = requestedSortingOrder === 'asc' ? 'Oldest First' : 'Newest First';
    const buttonLabel = nextSortingOrder === 'asc' ? 'Sort: Oldest First' : 'Sort: Newest First';
    const buttonIcon = nextSortingOrder === 'asc' ? 'bi-sort-up' : 'bi-sort-down';

    return response.status(200).render('allArticles.ejs', {
      allArticle,
      nextSortingOrder,
      currentOrderLabel,
      buttonLabel,
      buttonIcon
    });
  } catch (error) {
    return response.status(500).json({ message: `ERROR ${error}` });
  }
};
exports.getArticleById = async (request, response) => {
   try{
      const id = request.params.id
      const commentSortOrder = request.query.commentSortOrder === 'asc' ? 'asc' : 'dsc';
      const sortComment = commentSortOrder === 'asc' ? 1 : -1;
      const nextSortingOrder = commentSortOrder === 'asc' ? 'dsc' : 'asc';
      const buttonValue = commentSortOrder === 'asc' ? 'Sort: Newest First' : 'Sort: Oldest First';

      // check upfront if ID is valid
      if(!mongoose.Types.ObjectId.isValid(id)) {
         return response.status(400).json({message: 'Invalid article ID'});
      }
      const article = await Article.findById(id)
         .populate('author', 'username email')
         .populate({
            path: 'comments',
            select: 'body createdAt',
            options:{sort: {createdAt : sortComment}},
            populate: {
               path: 'author',
               select: 'username'
            }
         });
      if(!article) {
         return response.status(404).json({message: "There is no such Article"});
      } else {
         return response.status(200).render('singleArticle.ejs', {article:article,nextSortingOrder,buttonValue});
      }
   }catch(error) {
      return response.status(500).json({message: `ERROR ${error}`});
   }
}
exports.createArticle = async (request, response) => {
   try{
      const {title,body} = request.body || {};
      //Validate title (it is not empty or undefined)
      if (!title || title.trim().length === 0) {
         return response.status(400).json({ message: "Article title cannot be empty" });
      }
    // Validate body(it is not empty or undefined)
      if (!body || body.trim().length === 0) {
         return response.status(400).json({ message: "Article body cannot be empty" });
      }
      const newArticle = new Article({
         title: title,
         body: body,
         author: request.user._id
      })
      await newArticle.save()
      return response.redirect(`/article/${newArticle._id}`)
   }catch(error) {
      response.json(`Error ${error}`)
   }
}
exports.editArticle = async (request, response) => {
   try {
         const id = request.params.id;
         const { title, body } = request.body || {};

         if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ message: 'Invalid Article ID' });
         }
         //Validate title (it is not empty or undefined)
         if (!title || title.trim().length === 0) {
            return response.status(400).json({ message: "Article title cannot be empty" });
         }
         // Validate body(it is not empty or undefined)
         if (!body || body.trim().length === 0) {
            return response.status(400).json({ message: "Article body cannot be empty" });
         }
         const article = await Article.findByIdAndUpdate(
            id,
            { $set: { body: body, title: title } },
            { new: true, runValidators: true }
         );
         // by default mongo return the old doucment setting new to true allows for the
         // will ask it to send the updated version
         // and we are re-running the validators so our schema's integrity is maintained

         if (!article) {
            return response.status(404).json({ message: 'Article Not Found!' });
         }

         return response.redirect(`/article/${id}`);

   } catch (error) {
         return response.status(500).json({ message: `Error ${error}` });
   }
};

exports.deleteArticle = async (request,response) =>{
   try{
      const id = request.params.id;
      if(!mongoose.Types.ObjectId.isValid(id)){
         return response.status(400).json({message:"Article id is invalid"});
      }
      const article = await Article.findById(id).select('comments');
      if(!article){
         return response.status(404).json({message:"Article Not Found!"});
      }
      //deleting all the comments on the Article that's getting Deleted
      await Comment.deleteMany({_id:{$in:article.comments}});
      // Deleting the concered Article
      await Article.findByIdAndDelete(id);
      return response.redirect('/article');
   } catch (error){
      return response.status(500).json(`Couldn't delete the Article ${error}`);
   }
}

exports.createArticleForm = async (request,response) =>{
   response.render('createArticle.ejs');
}
exports.editArticleForm = async(request,response) =>{
   const {id} = request.params;
   const article = await Article.findById(id);
   const {title,body} = article;
   response.render('editArticle.ejs', {id:id,title:title,body:body});
}