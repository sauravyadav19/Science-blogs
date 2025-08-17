const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        body:{
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        article:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Article'
        }
    },
    {timestamps:true}
);

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;