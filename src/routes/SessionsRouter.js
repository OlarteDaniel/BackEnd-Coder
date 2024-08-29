import BaseRouter from "./BaseRouter.js";
import passport from "passport";
import jwt from 'jsonwebtoken'

import { passportCall } from "../middlewares/passportCall.js";

class SessionsRouter extends BaseRouter{
    init(){

        this.post('/register',passportCall('register'), async(req,res)=>{
            res.sendSuccess('Registered');    
        })
        
        this.post('/login',passportCall('login'),async(req,res)=>{
        
            const sessionUser = {
                name: `${req.user.first_name} ${req.user.last_name}`,
                role: req.user.roles,
                id: req.user._id
            }
        
            const token = jwt.sign(sessionUser,'clavesecreta',{expiresIn:'1d'});
        
            return res.cookie('sid',token).sendSuccess('logged in');
        })
        
        this.get('/logout',async(req,res)=>{
            res.clearCookie('sid').redirect('/login');
        })
        
        this.get('/current',passportCall('current'),async (req,res)=>{
        
            if(!req.user){
                return res.sendUnauthorized('Not logged in');
            }
        
            res.send({status:"sucess",payload:req.user});
        })

    }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();