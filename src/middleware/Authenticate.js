const passport = require("passport")

exports.Authenticate = (request,response,next) =>{
    // saving the redirecting url into a variable
    const returnTo = request.session.returnTo;
    passport.authenticate('local',{failureRedirect:'/users/login'})(request,response,(error)=>{
        if(error) return next(error);
        //since the passport clears the session after it authenticates ...adding our redirecting
        // url again to the session
        request.session.returnTo = returnTo;
        next();

    });
}