import passport from "passport";
import local from 'passport-local';

import { usersService,cartsService } from "../manager/index.js";
import AuthService from "../services/AuthService.js";

const LocalStrategy = local.Strategy;

const initializePassportConfig = () =>{
    
    passport.use('register', new LocalStrategy({usernameField:'email',passReqToCallback:true},async (req,email,password,done)=>{
        const {first_name,last_name,age} = req.body;

        if(!first_name || !last_name || !age){
            return done(null,false,{message:'Incomplete values'});
        }

        const user = await usersService.getUserByEmail(email);

        if(user){
            return done(null,false,{message:"User already exists"});
        };

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
        return done(null,resultUser._id);
    }))

    passport.use('login', new LocalStrategy({usernameField:'email'},async(email,password,done) =>{

        const user = await usersService.getUserByEmail(email);
        if(!user){
            return done(null,false,{message:"Incorrect credentials"});
        }

        const authService = new AuthService();
        const isValidPassword = await authService.validatePassword(password,user.password);

        if(!isValidPassword){
            return done(null,false,{message:"Incorrect credentials"});
        }

        return done(null,user._id)
    }))

    passport.serializeUser((userId,done)=>{
        done(null,userId);
    });

    passport.deserializeUser(async(userId,done)=>{
        const user = await usersService.getUserById(userId);
        
        const userSession = {
            name: `${user.first_name} ${user.last_name}`,
            role: user.roles
        }

        done(null,userSession);
    });

}

export default initializePassportConfig;