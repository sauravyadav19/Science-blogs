exports.isAuthenticated = (request,response,next) =>{
    if(request.isAuthenticated()){
        next();
    }
    else{
        response.redirect('/users/login')
    }

}