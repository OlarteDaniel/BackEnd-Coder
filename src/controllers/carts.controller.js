import {productsService,cartsService} from '../manager/index.js';

const getAll = async(req,res)=>{
    const carts = await cartsService.getCarts();

    if(carts.length === 0){
        return res.sendNotFound('There are no registered carts');
    }

    return res.sendSuccessWithPayload(carts);
}

const getOneById =async(req,res)=>{
    const cid = req.params.id;

    const cart = await cartsService.getCartsById(cid);

    if(!cart){
        return res.sendNotFound("Couldn't get cart")
    }

    return res.sendSuccessWithPayload(cart);
}

const addCart = async(req,res)=>{
    const {cid,pid} = req.params;

    const cart = await cartsService.getCartsById(cid);
    if(!cart) return res.sendNotFound("Cart doesn´t exist");
    const product = await productsService.getProductsById(pid);
    if(!product) return res.sendNotFound("Product doesn´t exist");
    
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

    return res.sendSuccess('Added product');
}

const updatedCart = async(req,res)=>{
    const cid = req.params.id;
    const data = req.body;

    const cart = await cartsService.getCartsById(cid);
    if(!cart) return res.sendNotFound("Cart doesn´t exist");

    cart.products = data;

    console.log(data)

    const result = await cartsService.modifyProducto(cid,cart);

    return res.sendSuccess('Updated cart');
}

const updateQuantityCart = async(req,res)=>{
    const {cid,pid} = req.params;
    const data = req.body;

    if(!data.quantity){
        return res.sendBadRequest('Information missing');
    }

    const quantity = data.quantity;

    const cart = await cartsService.getCartsById(cid);
    if(!cart) return res.sendNotFound("Cart doesn´t exist");
    
    const productIndex = cart.products.findIndex((prod) =>{
        return prod.product._id == pid;
    })

    if(productIndex === -1){
        return res.sendNotFound("Product not found in cart");
    }else{
        cart.products[productIndex].quantity = quantity;
        const result = await cartsService.modifyProducto(cid,cart);
    }

    return res.sendSuccess('Updated quantity');
}

const removeProduct = async(req,res)=>{
    const {cid,pid} = req.params;

    const cart = await cartsService.getCartsById(cid);
    if(!cart) return res.sendNotFound("Cart doesn´t exist");
    
    const productIndex = cart.products.findIndex((prod) =>{
        return prod.product._id == pid;
    })

    if(productIndex === -1){
        return res.sendNotFound("Product not found in cart");
    }else{
        if(cart.products[productIndex].quantity > 1){
            cart.products[productIndex].quantity--;
            const result = await cartsService.modifyProducto(cid,cart);
            return res.sendSuccess('Product quantity decreased by 1');
        }else{
            const result = await cartsService.deleteProduct(cid,pid);
        }
    }
    return res.sendSuccess('Product removed from cart');
}

const clearCart = async(req,res)=>{
    const cid = req.params.id;

    const cart = await cartsService.getCartsById(cid);
    if(!cart) return res.sendNotFound("Cart doesn´t exist");

    const result = await cartsService.deleteCart(cid);

    return res.sendSuccess('Cart removed');
}

export default {
    addCart,
    clearCart,
    getAll,
    getOneById,
    removeProduct,
    updateQuantityCart,
    updatedCart
}

