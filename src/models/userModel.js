const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true, 'Username already Exists']
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email already Exists'],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },
    password: {
        type:String,
        required:true,
        minlength:3,
        trim:true
    }

},{timestamps:true});

const User = new mongoose.model('User',userSchema);

module.exports = User;