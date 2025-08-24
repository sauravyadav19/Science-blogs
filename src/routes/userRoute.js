const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController.js');

userRoute.get('/', userController.getAllUser);
userRoute.get('/register',userController.registerUser);
userRoute.get('/login',userController.loginUser);
userRoute.get('/:id',userController.getUserById)
userRoute.post('/', userController.createUser);


module.exports = userRoute;
