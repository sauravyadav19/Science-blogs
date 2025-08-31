exports.isAuthenticated = (request,response,next) =>{
    if(request.isAuthenticated()){
        next();
    }
    else{
        request.session.returnTo = request.originalUrl
        response.redirect('/users/login')
    }

}