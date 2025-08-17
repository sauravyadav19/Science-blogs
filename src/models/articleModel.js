const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
            minlength:1
        },
        body: {
            type: String,
            required:true,
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        comments:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }]
    },
    {timestamps:true}
);

const Article = mongoose.model('Article',articleSchema);

module.exports = Article;