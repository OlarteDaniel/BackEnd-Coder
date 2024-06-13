import express from 'express';
import handlebars from 'express-handlebars';

import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = process.env.PORT||8080;

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use('/products',viewsRouter);

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));