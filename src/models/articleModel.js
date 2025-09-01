const mongoose = require('mongoose')
const ImageSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            trim: true
        },
        path: {
            type: String,
            trim: true
        }
    }
)
ImageSchema.virtual('thumbnail').get(function (){
    return this.path ? this.path.replace('/upload', '/upload/w_500,h_600') : null;

})
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
        }],
        image: ImageSchema
      
    },
    {timestamps:true}
);

const Article = mongoose.model('Article',articleSchema);

module.exports = Article;