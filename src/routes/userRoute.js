const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController.js');
const {Authenticate} = require('../middleware/Authenticate.js');
const { isAuthenticated } = require('../middleware/isAuthenticated.js');

userRoute.get('/', userController.getAllUser);
userRoute.get('/register',userController.registerUser);
userRoute.get('/login',userController.loginUser);
userRoute.post('/login',Authenticate,userController.logged);
userRoute.get('/logout',isAuthenticated, userController.logout)
userRoute.get('/:id',userController.getUserById)
userRoute.post('/', userController.createUser);


module.exports = userRoute;
