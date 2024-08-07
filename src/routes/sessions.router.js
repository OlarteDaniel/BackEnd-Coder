import { Router } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken'

import { passportCall } from "../middlewares/passportCall.js";

const sessionsRouter = Router();

sessionsRouter.post('/register',passportCall('register'), async(req,res)=>{
    res.send({status:"sucess",message:"Registered"});    
})

sessionsRouter.post('/login',passportCall('login'),async(req,res)=>{

    const sessionUser = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.roles,
        id: req.user._id
    }

    const token = jwt.sign(sessionUser,'clavesecreta',{expiresIn:'1d'});

    return res.cookie('sid',token).send({status:"success",message:"logged in"});
})

sessionsRouter.get('/logout',async(req,res)=>{
    res.clearCookie('sid').redirect('/login');
})

sessionsRouter.get('/current',passportCall('current'),async (req,res)=>{

    if(!req.user){
        return res.status(401).send({ status: "Error", message: "Not logged in" });
    }

    res.send({status:"sucess",payload:req.user});
})

export default sessionsRouter;