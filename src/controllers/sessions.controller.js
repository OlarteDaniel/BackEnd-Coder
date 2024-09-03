import jwt from 'jsonwebtoken';

import config from "../config/config.js";
import UserDTOSession from '../dto/user/UserDTOSession.js';
import UserDTOCurrent from '../dto/user/UserDTOCurrent.js'

const register  = (req,res)=>{
    res.sendSuccess('Registered');    
}

const login = (req,res)=>{
        

    const sessionUserObject = new UserDTOSession(req.user);
    const sessionUser = {...sessionUserObject};
    

    const token = jwt.sign(sessionUser,config.auth.jwt.SECRET,{expiresIn:'1d'});

    return res.cookie('sid',token).sendSuccess('logged in');
}

const logout = (req,res)=>{
    res.clearCookie('sid').redirect('/login');
}

const current = (req,res)=>{
        
    if(!req.user){
        return res.sendUnauthorized('Not logged in');
    }

    const currentUserObject = new UserDTOCurrent(req.user);
    const currentUser = {...currentUserObject};

    res.send({status:"sucess",payload:currentUser});
}

export default{
    current,
    login,
    logout,
    register
}