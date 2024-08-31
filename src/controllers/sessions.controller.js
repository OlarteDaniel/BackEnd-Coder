import jwt from 'jsonwebtoken';

import config from "../config/config.js";

const register  = (req,res)=>{
    res.sendSuccess('Registered');    
}

const login = (req,res)=>{
        
    const sessionUser = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.roles,
        id: req.user._id
    }

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

    res.send({status:"sucess",payload:req.user});
}

export default{
    current,
    login,
    logout,
    register
}