const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:[true,'Email already Exists'],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },

},{timestamps:true});
//This add some methods to our schema and now we do not have to explicity add username
// and password to the schema either as passport handles it
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model('User',userSchema);

module.exports = User;