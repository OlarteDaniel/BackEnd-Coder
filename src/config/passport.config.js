import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local';
import {ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt';

import { usersService,cartsService } from "../manager/index.js";
import AuthService from "../services/AuthService.js";

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
        return done(null,resultUser);
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

        return done(null,user)
    }))

    passport.use('current', new JWTStrategy({
        secretOrKey:"clavesecreta",
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor])
    }, async(payload,done)=>{
        return done(null,payload);
    }))
}

function cookieExtractor(req){
    return req?.cookies?.['sid'];
}

export default initializePassportConfig;