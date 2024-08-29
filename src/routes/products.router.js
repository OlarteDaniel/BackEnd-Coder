import express from 'express';
import { Router } from 'express';

import {productsService} from '../manager/index.js';
import uploader from '../services/uploadService.js';

const router = Router();

router.use(express.json());


// METODO GET

router.get('/',async(req,res) =>{
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const products = await productsService.getProducts(page,limit);
    
    if(products.length === 0){
        return res.send({status:"error",payload:"There are no registered products"});
    }

    const prevLink = () =>{
        if(products.hasPrevPage){
            return `http://localhost:8080/api/products?page=${products.prevPage}`
        }else{
            return null;
        }
    }

    const nextLink = () =>{
        if(products.hasNextPage){
            return `http://localhost:8080/api/products?page=${products.nextPage}`
        }else{
            return null;
        }
    }

    return res.send({
        status:"sucess",
        payload:products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: prevLink(),
        nextLink: nextLink()
    });

})

// METODO GET


// METODO GET POR ID

router.get('/:id',async(req,res) =>{
    const pid = req.params.id;

    const product = await productsService.getProductsById(pid);

    return res.send({status:"sucess",payload:product});
})

// METODO GET POR ID


// METODO POST

router.post('/',uploader.array('thumbnails',3),async(req,res) =>{
    
    const {title,description,code,price,stock,category} = req.body;
    const thumbnails = [];

    if(!title || !description || !code || !price || !category){
        return res.status(400).send({status:"error",error:"Information missing"});
    }

    for(let i=0; i<req.files.length;i++){
        thumbnails.push({mimetype:req.files[i].mimetype,path:`/upload/products${req.files[i].filename}`,main:i==0})
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        stock: stock || 1,
        category,
        thumbnails
    }

    const result = await productsService.createProduct(newProduct);

    if(!result){
        return res.status(400).send("Could not create product");
    }

    return res.send({status:"sucess",payload:"Product created"});
})

// METODO POST


// METEDO PUT

router.put('/:id',async(req,res)=>{
    const pid = req.params.id;
    const data = req.body;

    if(!data.title || !data.description || !data.code || !data.category || !data.price){
        return res.status(400).send({status:"error",error:"Information missing"});
    }

    const updateProduct = {
        title: data.title,
        description: data.description,
        code: data.code,
        price: data.price,
        stock: data.stock,
        category: data.category
    }

    

    const result = await productsService.updateProduct(pid,updateProduct);

    console.log(result);

    res.send({status:"sucess",message:"Updated product"})

})

// METEDO PUT


// METODO DELETE

router.delete('/:id',async(req,res) =>{
    const pid = req.params.id;

    const result = await productsService.deleteProduct(pid);
    
    console.log(result);

    if(result.deletedCount < 1){
        return res.status(400).send({status:"error",error:"The product to be removed does not exist"})
    }

    return res.send({status:"sucess",message:"product removed"});
})

// METODO DELETE

export default router;