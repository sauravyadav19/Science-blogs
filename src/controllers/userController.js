const mongoose = require('mongoose')
const User = require('../models/userModel.js');
const { request } = require('express');

exports.getAllUser =  async (request,response) =>{

    try{
        const users = await User.find();
        return response.status(200).json(users);

    }catch(error){
        return response.status(500).json({message:`Couldn't reterive Users ${error}`})
    }

}

exports.getUserById = async(request,response) =>{
    try{
        const {id} = request.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return response.status(400).json({message:'Invalid User Id'});
        }
        const user = await User.findById(id);
        if(!user){
            return response.status(404).json({message:"User does not exist"});
        }
        return response.status(200).json(user);
    }catch(error){

        return response.status(500).json({message:`Couldn't reterive the User ${error}`});

    }
}

exports.createUser = async (request,response) =>{
    try{
        const {username,email,password} = request.body || {};
        if (!username || username.trim().length === 0) {
            return response.status(400).json({ message: "Username cannot be empty" });
        }
        if (!email || email.trim().length === 0) {
            return response.status(400).json({ message: "email cannot be empty" });
        }
        if (!password || password.trim().length === 0) {
            return response.status(400).json({ message: "password cannot be empty" });
        }
        const newUser = new User({
            username:username,
            email:email,
        })
        const registerdUser = await User.register(newUser,password);
        request.login(registerdUser,(error)=>{
            if(error) return next(error);
            return  response.redirect('/article');
    })
       
    }catch(error){
        return response.status(500).json({message:`User creation failed ${error}`});
    }

}
//To-do
    //Implement user Deletion
    //Implement Editing User

exports.registerUser = async (request,response)=>{
    response.render('registerUser.ejs')
}
exports.loginUser = async (request,response)=>{
    request.session.returnTo = request.query.returnTo;
    response.render('loginUser.ejs')
}

exports.logged = async (request,response)=>{
    const redirectUrl = request.session.returnTo || '/article';
    delete request.session.returnTo;
    response.redirect(redirectUrl);
}
exports.logout = (request,response,next) =>{
    request.logout(
       function (error){
        if(error)
            next(error);
        console.log("logout out");
        return response.redirect('/article');
        }
    )
    
}