const passport = require("passport")

exports.Authenticate = (request,response,next) =>{
    passport.authenticate('local',{failureRedirect:'/users/login'})(request,response,next);
}