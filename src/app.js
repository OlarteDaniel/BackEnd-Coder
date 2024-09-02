import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import __dirname from './utils.js';
import initializePassportConfig from './config/passport.config.js';
import config from './config/config.js';

import ProductsRouter from './routes/ProductsRouter.js';
import CartsRouter from './routes/CartsRouter.js';
import SessionsRouter from './routes/SessionsRouter.js';
import ViewsRouter from './routes/ViewsRouter.js';


const app = express();
const PORT = config.app.PORT;

const CONNECTION_STRING = config.mongo.URL;
const connection = mongoose.connect(CONNECTION_STRING);

app.engine('handlebars',handlebars.engine({
    defaultLayout: 'main',
    helpers:{
        eq: function(a,b){
            return a === b;
        },
        multiply: function(a, b){
            return a*b;
        }
    }
}));
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

initializePassportConfig();
app.use(passport.initialize());

app.use('/',ViewsRouter);

app.use('/api/sessions',SessionsRouter);
app.use('/api/products',ProductsRouter);
app.use('/api/carts',CartsRouter);

const server = app.listen(PORT,console.log(`Listening on port ${PORT}`));