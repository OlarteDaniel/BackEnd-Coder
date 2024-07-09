import express from 'express';
import mongoose from 'mongoose';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

const CONNECTION_STRING = 'mongodb+srv://DanielOlarte:123@clustercoderhouse.dzsdloa.mongodb.net/store?retryWrites=true&w=majority&appName=ClusterCoderHouse'

const connection = mongoose.connect(CONNECTION_STRING);

app.use(express.json());

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

const server = app.listen(PORT,console.log(`Listening on port ${PORT}`));