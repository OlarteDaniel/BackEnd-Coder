import BaseRouter from "./BaseRouter.js";
import passport from "passport";
import jwt from 'jsonwebtoken'

import { passportCall } from "../middlewares/passportCall.js";
import config from "../config/config.js";

class SessionsRouter extends BaseRouter{
    init(){

        this.post('/register',['PUBLIC'],passportCall('register'), async(req,res)=>{
            res.sendSuccess('Registered');    
        })
        
        this.post('/login',['PUBLIC'],passportCall('login'),async(req,res)=>{
        
            const sessionUser = {
                name: `${req.user.first_name} ${req.user.last_name}`,
                role: req.user.roles,
                id: req.user._id
            }
        
            const token = jwt.sign(sessionUser,config.auth.jwt.SECRET,{expiresIn:'1d'});
        
            return res.cookie('sid',token).sendSuccess('logged in');
        })
        
        this.get('/logout',['USER','ADMIN'],async(req,res)=>{
            res.clearCookie('sid').redirect('/login');
        })
        
        this.get('/current',['USER','ADMIN'],passportCall('current'),async (req,res)=>{
        
            if(!req.user){
                return res.sendUnauthorized('Not logged in');
            }
        
            res.send({status:"sucess",payload:req.user});
        })

    }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();