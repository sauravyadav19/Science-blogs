const mongoose = require('mongoose')
const Article = require('../models/articleModel'); 
const User = require('../models/userModel.js')
const Comment = require('../models/commentModel.js')

exports.getArticle= async(request,response) =>{
    try{
        const allArticle = await Article.find().populate('author','username')
        return response.status(200).json(allArticle);
    }catch(error){
       return response.status(500).json({message:`ERROR ${error}`})
    }
}
exports.getArticleById = async (request,response)=>{
    try{
    const id = request.params.id
    // check upfront if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: 'Invalid article ID' });
    }
    const article = await Article.findById(id)
          .populate('author','username email')
              .populate(
                {path:'comments',
                 select:'body',
                    populate:{
                        path:'author',
                        select: 'username'
                    }
                });
    if(!article){
        return response.status(404).json({message:"There is no such Article"});
    }
    else{
        return response.status(200).json(article);
    }
    }catch(error){
        return response.status(500).json({message:`ERROR ${error}`})
    }
}