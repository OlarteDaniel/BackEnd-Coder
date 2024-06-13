import express from 'express';
import { Router } from 'express';
import { cartsService } from '../managers/index.js';

const router = Router();

router.use(express.json());

// const manager = new CartsManager();

// METODO GET
router.get('/:id',async(req,res) =>{
    const cid = req.params.id;
    
    if(isNaN(cid)){
        return res.status(400).send({status:"error", error:"The parameter entered must be numeric."});
    }

    const cart = await cartsService.getCartsById(cid);

    if(cart == null){
        return res.status(404).send({status:"error", error:"Couldn't get cart"});
    }

    const products = cart.products;

    if(products.length === 0){
        return res.status(404).send({status:"error", error:"there are no products in the cart"})
    }

    res.send({status:"sucess",payload:products});
})

// METODO GET


// METODO POST

router.post('/', async(req,res) => {
    const result = await cartsService.createCart()

    if(result === -1){
        return res.status(500).send({status:"error",error:"Couldn't create cart"});
    }

    res.send({status:"success",message:`cart created with id: ${result}`});
});

// METODO POST


// METODO POST POR CARRITO 

router.post('/:cid/product/:pid',async(req,res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;

    if(isNaN(cid) || isNaN(pid)){
        return res.status(400).send({status:"error", error:"The parameter entered must be numeric."});
    }

    const carts = await cartsService.addProduct(cid,pid);

    if(!carts){
        return res.status(404).send({status:"error", error:`The cart with id: ${cid} does not exist`});
    }

    const result = await cartsService.savedCarts(carts);

    if(result == false){
        return res.status(500).send({status:"error",error:"The product could not be added"});
    }

    res.send({status:"success",message:`Product with id: ${pid} was added to cart with id: ${cid}`});
})

// METODO POST POR CARRITO 

export default router;