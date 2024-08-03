import express from 'express';
import { Router } from 'express';

import {productsService,cartsService} from '../manager/index.js';

const router = Router();

router.use(express.json());

// METODO GET

router.get('/',async(req,res)=>{
    const carts = await cartsService.getCarts();

    if(carts.length === 0){
        return res.send({status:"error",payload:"There are no registered carts"});
    }

    return res.send({status:"sucess",payload:carts});
})

// METODO GET


// METODO GET POR ID
router.get('/:id',async(req,res)=>{
    const cid = req.params.id;

    const cart = await cartsService.getCartsById(cid);

    if(!cart){
        return res.status(404).send({status:"error", error:"Couldn't get cart"});
    }

    return res.send({status:"sucess",payload:cart});
})

// METODO GET POR ID


// METODO POST

// router.post('/',async(req,res)=>{
//     const newCart = {
//         products:[]
//     }

//     const result = await cartsService.createCart(newCart);

//     console.log(result);

//     if(!result){
//         return res.status(500).send({status:"error",error:"Couldn't create cart"});
//     }

//     res.send({status:"success",message:"cart created"});
// })

// METODO POST


// METODO POST POR CARRITO 

router.post('/:cid/products/:pid',async(req,res)=>{
    const {cid,pid} = req.params;

    const cart = await cartsService.getCartsById(cid);
    if(!cart) return res.status(404).send({status:"error", error:"Cart doesn´t exist"});
    const product = await productsService.getProductsById(pid);
    if(!product) return res.status(404).send({status:"error", error:"Product doesn´t exist"});
    
    const productIndex = cart.products.findIndex((prod) =>{
        return prod.product._id == pid;
    })

    if(productIndex === -1){
        cart.products.push({
            product:pid,
            quantity:1
        })
    }else{
        cart.products[productIndex].quantity++;
    }

    const result = await cartsService.modifyProducto(cid,cart);

    return res.send({status:"success",message:"Added product"});
})

// METODO POST POR CARRITO 


// METODO PUT POR CARRITO

router.put('/:id',async(req,res)=>{
    const cid = req.params.id;
    const data = req.body;

    const cart = await cartsService.getCartsById(cid);
    if(!cart) return res.status(404).send({status:"error", error:"Cart doesn´t exist"});

    cart.products = data;

    console.log(data)

    const result = await cartsService.modifyProducto(cid,cart);

    return res.send({status:"success",message:"Updated cart"});
});

// METODO PUT POR CARRITO


// METODO PUT POR CANTIDAD DE PRODUCTOS

router.put('/:cid/products/:pid',async(req,res)=>{
    const {cid,pid} = req.params;
    const data = req.body;

    if(!data.quantity){
        return res.status(400).send({status:"error",error:"Information missing"});
    }

    const quantity = data.quantity;

    const cart = await cartsService.getCartsById(cid);
    if(!cart) return res.status(404).send({status:"error", error:"Cart doesn´t exist"});
    
    const productIndex = cart.products.findIndex((prod) =>{
        return prod.product._id == pid;
    })

    if(productIndex === -1){
        return res.status(404).send({status:"error", error:"Product not found in cart"});
    }else{
        cart.products[productIndex].quantity = quantity;
        const result = await cartsService.modifyProducto(cid,cart);
    }

    return res.send({ status: "success", message: "Updated quantity" });
})

// METODO PUT POR CANTIDAD DE PRODUCTOS


// METODO DELETE POR PRODUCTO 

router.delete('/:cid/products/:pid',async(req,res)=>{
    const {cid,pid} = req.params;

    const cart = await cartsService.getCartsById(cid);
    if(!cart) return res.status(404).send({status:"error", error:"Cart doesn´t exist"});
    
    const productIndex = cart.products.findIndex((prod) =>{
        return prod.product._id == pid;
    })

    if(productIndex === -1){
        return res.status(404).send({status:"error", error:"Product not found in cart"});
    }else{
        if(cart.products[productIndex].quantity > 1){
            cart.products[productIndex].quantity--;
            const result = await cartsService.modifyProducto(cid,cart);
            return res.send({ status: "success", message: "Product quantity decreased by 1" });
        }else{
            const result = await cartsService.deleteProduct(cid,pid);
        }
    }

    return res.send({ status: "success", message: "Product removed from cart" });
})

// METODO DELETE POR PRODUCTO 


// METODO DELETE CARRITO 

router.delete('/:id',async(req,res)=>{
    const cid = req.params.id;

    const cart = await cartsService.getCartsById(cid);
    if(!cart) return res.status(404).send({status:"error", error:"Cart doesn´t exist"});

    const result = await cartsService.deleteCart(cid);

    return res.send({status:"sucess",message:"Cart removed"});
})

// METODO DELETE CARRITO 
export default router;