import { Router } from "express";

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

export default viewsRouter