import express from 'express';
import { Router } from "express";

import { productsService } from '../managers/index.js';
import uploader from '../services/uploader.js';

const router = Router();

router.use(express.json());

// const manager = new ProductsManager();

// METODO GET

router.get('/', async(req,res) =>{
    const products = await productsService.getProducts();

    if(products === null){
        return res.status(500).send({status:"error",error:"Couldn't get products"});
    }

    if(products.length === 0){
        return res.status(500).send({status:"error",error:"There is no product"})
    }

    const limit = parseInt(req.query.limit) || products.length;

    if(limit>products.length){
        return res.status(400).send({status:"error",error:"The amount enteres is not valid"});
    }

    const limitedProducts = products.slice(0,limit);

    res.send({status:"sucess",payload:limitedProducts});
})

// METODO GET


// METODO GET POR ID

router.get('/:id',async (req,res) =>{
    const pid = req.params.id;

    if(isNaN(pid)){
        return res.status(400).send({status:"error",error:"The parameter entered must be numeric."});
    }

    const product = await productsService.getProductsById(pid);
    if(!product){
        return res.status(400).send({status:"error",error:"Couldn't get product"});
    }

    res.send({status:"sucess",payload:product});
})

// METODO GET POR ID

// METODO POST

router.post('/',uploader.array('thumbnail',3),async(req,res)=>{
    const product = req.body;
    product.thumbnails = [];
    if(!product.title || !product.description || !product.code || !product.category || !product.price){
        return res.status(400).send("Information missing");
    }

    

    console.log(product)

    for(let i=0;i<req.files.length;i++){
        product.thumbnails.push({mimetype:req.files[i].mimetype,path:`/files/products/${req.files[i].filename}`,main:i==0})
    }

    const result = await productsService.createProduct(product);

    if(result === -1){
        return res.status(500).send({status:"error",error:"Couldn't create product"});
    }

    res.send({status:"success",message:`product created with id: ${result}`});
})

// METODO POST


// METODO PUT

router.put('/:id',async (req,res) => {
    const pid = req.params.id;
    const update = req.body

    const products = await productsService.getProducts();

    const prodIndex = products.findIndex((prod) => {
        return prod.id == pid;
    }) 

    if(prodIndex === -1){
        return res.status(404).send({status:"error",error:"Product does not exist"});
    }

    const updateProduct = {
        ...update,
        id:pid
    }

    products[prodIndex] = updateProduct;

    const result = await productsService.updateProduct(products);

    if(result === -1){
        return res.status(500).send({status:"error",error:"Product could not be updated"});
    }

    res.send({status:"sucess",message:`The product with id: ${pid} has been successfully updated`})

})

// METODO PUT


//METODO DELETE 

router.delete('/:id',async(req,res) => {
    const pid = req.params.id;

    const products = await productsService.getProducts();

    const productDelete = products.find((prod) => prod.id == pid);

    if(productDelete == null){
        return res.status(404).send({status:"error",error:"product does not exist"});
    }

    const productsUpdate = products.filter((prod) => prod.id != pid );

    const result = await productsService.updateProduct(productsUpdate);

    if(result === -1){
        return res.status(500).send({status:"error",error:"Product could not be deleted"});
    }

    res.send({status:"sucess",message :`The product ${productDelete.title} with id: ${productDelete.id} has been disposed of correctly`});
})

//METODO DELETE 

export default router;