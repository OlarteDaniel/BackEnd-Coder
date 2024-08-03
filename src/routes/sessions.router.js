import { Router } from "express";

import {usersService,cartsService} from '../manager/index.js'
import AuthService from "../services/AuthService.js";

const sessionsRouter = Router();

sessionsRouter.post('/register', async(req,res)=>{
    const {first_name,last_name,email,age,password} = req.body;

    if(!first_name || !last_name || !email || !age || !password){
        return res.status(400).send({status:"error",error:"Incomplete values"});
    }

    const user = await usersService.getUserByEmail(email);

    if(user){
        return res.status(400).send({status:"error",error:"User alredy exists"});
    }

    const authService = new AuthService();
    const hashedPassword = await authService.hashPassword(password);

    const newCart = {
        products:[]
    }

    const resultCart = await cartsService.createCart(newCart);

    const newUser = {
        first_name,
        last_name,
        email,
        age,
        password:hashedPassword,
        cart: resultCart._id
    }

    const resultUser = await usersService.createUser(newUser);
    res.send({statuts:"sucess",message:"Registered"});
})

sessionsRouter.post('/login', async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).send({status:"error",error:"Incomplete Values"});
    }

    const user = await usersService.getUserByEmail(email);
    if(!user){
        return res.status(400).send({status:"error",error:"User alredy exists"})
    }

    const authService = new AuthService();
    const isValidPassword = await authService.validatePassword(password,user.password);

    if(!isValidPassword){
        return res.status(400).send({status:"error",error:"Incorrect credentials"})
    }

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        role:user.roles
    }
    res.send({status:"success",message:"logged in"});
})

export default sessionsRouter;