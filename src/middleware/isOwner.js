const Article = require("../models/articleModel")

exports.isOwner = async (request,response,next) =>{
    const {id} = request.params
    const article = await Article.findById(id);
    if(article.author.equals(request.user._id)){
        next();
    }else{
        return response.redirect(`/article/${id}`)
    }
}