import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = process.env.PORT||8080;



app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/products',viewsRouter);

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));
const socketServer = new Server(server);

socketServer.on('connection',(socketClient) => {
    console.log("Cliente Conectado");

    socketClient.on('addProduct', data =>{
        console.log(`Se agrego el producto con el id ${data}`);
        socketServer.emit('productAdded');
    })
});

