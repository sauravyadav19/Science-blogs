// Import Express
const express = require('express');
const articleRoute= require('./routes/articleRoute.js')
const userRoute = require('./routes/userRoute.js')
const path = require('path')
const sessions = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/userModel.js');

// Create an Instance of Express
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views') )
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Passport requires us to integrate express sessions
app.use(sessions({
    secret:process.env.SESSION_CONFIG
}))
// Initializing passport and its session
app.use(passport.initialize())
app.use(passport.session())
// Asking passport to use local Strategy by call User.authenticate;
// even though we have not created an method a authenticate on our User model
// but as a result of adding the local-passport mongoose plugin, some methods are 
// added on to it; one of being atuheicate 
passport.use(new localStrategy(User.authenticate()))
//This basically tells passport how to store(serialize) and unstore(deserialize) a user in its sessions 
// these serialize and deserialze functions are added as a result of addding the plugin in our User schema 
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/article',articleRoute)
app.use('/users', userRoute);

//Export the Express Instance
module.exports = app;
