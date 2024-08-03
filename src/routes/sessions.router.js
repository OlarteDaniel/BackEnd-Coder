import { Router } from "express";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFail',failureMessage:true}), async(req,res)=>{
    res.send({status:"sucess",message:"Registered"});    
})

sessionsRouter.get('/registerFail',(req,res)=>{
    const messages = req.session.messages || [];
    req.session.messages = [];

    res.status(401).send({ status: "error", messages });
})

sessionsRouter.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/failureLogin',failureMessage:true}),async(req,res)=>{
    res.send({status:"success",message:"logged in"});
})

sessionsRouter.get('/failureLogin',(req,res)=>{
    const messages = req.session.messages || [];
    req.session.messages = [];

    res.status(401).send({ status: "error", messages });
})

sessionsRouter.get('/logout',async(req,res)=>{
    req.session.destroy(error=>{
        if(error) return res.status(500).send({status:"error",error:"Couldn't close session"})
        res.redirect('/login')
    })
})

export default sessionsRouter;