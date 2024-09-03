import {productsService,cartsService,usersService,ticketService} from '../services/services.js';
import { generarCodigo } from "../utils.js";

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
    const {uid,pid} = req.params
    const qty = req.body.quantity
    
    if(isNaN(qty) || qty <= 0) return res.sendBadRequest('The amount entered is not valid.')
    
    const qtyParse = parseInt(qty);
    const user = await usersService.getUserById(uid)
    const cart = await cartsService.getCartsById(user.cart)

    if(!cart) return res.sendNotFound("Cart doesn´t exist");
    const product = await productsService.getProductsById(pid);
    if(!product) return res.sendNotFound("Product doesn´t exist");
    
    const productIndex = cart.products.findIndex((prod) =>{
        return prod.product._id == pid;
    })

    if(qtyParse > product.stock) return res.sendBadRequest('Exceeds the quantity in stock')

    if(productIndex === -1){
        cart.products.push({
            product:pid,
            quantity: qtyParse
        })
    }else{
        cart.products[productIndex].quantity +=  qtyParse;
        if(cart.products[productIndex].quantity > product.stock) return res.sendBadRequest('Exceeds the quantity in stock')
    }


    // if(cart.products[productIndex].quantity > product.stock) return res.sendBadRequest('Exceeds the quantity in stock')

    const result = await cartsService.modifyProducto(user.cart,cart);

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
        const result = await cartsService.deleteProduct(cid,pid);
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

const finalizePurchase = async(req,res)=>{
    const {cid} = req.params

    const codigo = generarCodigo(4)

    const cart = await cartsService.getCartsById(cid)
    const plainCart = JSON.parse(JSON.stringify(cart));
    const total = plainCart.products.reduce((accumulator, item) => {
        return accumulator + (item.product.price * item.quantity);
    }, 0);

    const purchase_datetime = new Date().toDateString();

    const user = await usersService.getUserById(req.user.id);
    const email = user.email;

    //---------------VALIDACIONES---------------

    const productsObtened = await productsService.getProducts();

    for (const item of plainCart.products) {
        const productInStock = productsObtened.docs.find(p => p._id.toString() === item.product._id.toString());

        if (!productInStock) {
            return res.sendNotFound(`Producto con ID ${item.product._id} no encontrado en el catálogo.`);
        }

        if (item.quantity > productInStock.stock) {
            return res.sendBadRequest(`La cantidad del producto ${item.product.title} en el carrito, excede el stock disponible.`)
        }else{
            const updateProduct = {
                stock: productInStock.stock - item.quantity
            }

            const resultProduct = await productsService.updateProduct(productInStock._id,updateProduct);
        }

    }

    const newTicket = {
        code:codigo,
        purchase_datetime,
        amount: total,
        purchase: email
    }

    const result = await ticketService.createTicket(newTicket);

    if(!result){
        return res.sendBadRequest('Could not create Ticket');
    }

    //---------------VALIDACIONES---------------


    //---------------OPERACIONES---------------

    const resultCart = await cartsService.deleteCart(cid);

    //---------------OPERACIONES---------------

    return res.sendSuccessWithPayload(newTicket,'Ticket created');
}

export default {
    addCart,
    clearCart,
    finalizePurchase,
    getAll,
    getOneById,
    removeProduct,
    updateQuantityCart,
    updatedCart
}

