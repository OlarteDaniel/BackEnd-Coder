import express from 'express';
import { Router } from 'express';
import { productsService } from '../managers/index.js';

const router = Router();

router.get('/',async (req,res) =>{
    const products = await productsService.getProducts();
    res.render('Home',{
        products,
        css:'Home'
    });
})

router.get('/realtimeproducts', (req,res) =>{
    res.render('RealTimeProducts',{
        css:'RealTimeProducts'
    });
})

router.get('/:id',async (req,res) =>{
    const pid = req.params.id;
    const product = await productsService.getProductsById(pid);
    res.render('ProductDetails',{
        css:'ProductDetails',
        product
    })
})




export default router;