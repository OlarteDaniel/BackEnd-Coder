import passport from "passport";
export const passportCall = (strategy) =>{
    return async(req,res,next) =>{
        passport.authenticate(strategy, function(error,user,info){

            if(error) return next(error);
            
            if(!user){
                req.user = null;
                if(info.message == "No auth token"){
                    return next();
                }else{
                    return res.sendUnauthorized("unauthorized" );
                }
            }

            req.user = user;
            next();
        })(req,res,next);
    }
}