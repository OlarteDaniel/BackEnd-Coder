import { Router } from "express";
import passport from "passport";
import { passportCall } from "../middlewares/passportCall.js";

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

viewsRouter.get('/profile',passportCall('current'),(req,res) =>{

    if(!req.user){
        return res.redirect('/login');
    }

    res.render('Profile',{
        title:"Perfil de usuario",
        css:'profile',
        user:req.user
    })

})

export default viewsRouter