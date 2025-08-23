const express = require('express');
const userRoute = express.Router();
const userController = require('../controllers/userController.js');

userRoute.get('/', userController.getAllUser);
userRoute.get('/:id',userController.getUserById)

module.exports = userRoute;
