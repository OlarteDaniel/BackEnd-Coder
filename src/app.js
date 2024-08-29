import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import __dirname from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
import initializePassportConfig from './config/passport.config.js';

import ProductsRouter from './routes/ProductsRouter.js';
import CartsRouter from './routes/CartsRouter.js';
import SessionsRouter from './routes/SessionsRouter.js';
import ViewsRouter from './routes/ViewsRouter.js';


const app = express();
const PORT = process.env.PORT || 8080;

const CONNECTION_STRING = 'mongodb+srv://DanielOlarte:123@clustercoderhouse.dzsdloa.mongodb.net/store?retryWrites=true&w=majority&appName=ClusterCoderHouse'
const connection = mongoose.connect(CONNECTION_STRING);

app.engine('handlebars',handlebars.engine());
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