import { Router } from "express";
import passport from "passport";

const viewsRouter = Router();

viewsRouter.get('/',(req,res)=>{
    res.render('Home',{
        title:'Index'
    });
})

viewsRouter.get('/register',(req,res)=>{
    res.render('Register',{
        title:'Registrar Usuario',
        css:'register'
    })
})

viewsRouter.get('/login',(req,res)=>{
    res.render('Login',{
        title:'Iniciar sesion',
        css:'login'
    })
})

viewsRouter.get('/profile',passport.authenticate('current',{session:false}),(req,res) =>{

    if(!req.user){
        return res.redirect('/login');
    }

    res.render('Profile',{
        title:'Profile',
        css:'profile',
        user: req.user
    })
})

export default viewsRouter