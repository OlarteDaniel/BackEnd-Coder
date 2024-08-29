import BaseRouter from './BaseRouter.js'

import {productsService,cartsService} from '../manager/index.js';

class CartsRouter extends BaseRouter{

    init(){

        this.get('/',['ADMIN'],async(req,res)=>{
            const carts = await cartsService.getCarts();
        
            if(carts.length === 0){
                return res.sendNotFound('There are no registered carts');
            }
        
            return res.sendSuccessWithPayload(carts);
        })
        
        // METODO GET
        
        
        // METODO GET POR ID
        this.get('/:id',['USER'],async(req,res)=>{
            const cid = req.params.id;
        
            const cart = await cartsService.getCartsById(cid);
        
            if(!cart){
                return res.sendNotFound("Couldn't get cart")
            }
        
            return res.sendSuccessWithPayload(cart);
        })
        
        // METODO GET POR ID
        
        
        // METODO POST POR CARRITO 
        
        this.post('/:cid/products/:pid',['USER'],async(req,res)=>{
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
        })
        
        // METODO POST POR CARRITO 
        
        
        // METODO PUT POR CARRITO
        
        this.put('/:id',['USER'],async(req,res)=>{
            const cid = req.params.id;
            const data = req.body;
        
            const cart = await cartsService.getCartsById(cid);
            if(!cart) return res.sendNotFound("Cart doesn´t exist");

            cart.products = data;
        
            console.log(data)
        
            const result = await cartsService.modifyProducto(cid,cart);
        
            return res.sendSuccess('Updated cart');
        });
        
        // METODO PUT POR CARRITO
        
        
        // METODO PUT POR CANTIDAD DE PRODUCTOS
        
        this.put('/:cid/products/:pid',['USER'],async(req,res)=>{
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
        })
        
        // METODO PUT POR CANTIDAD DE PRODUCTOS
        
        
        // METODO DELETE POR PRODUCTO 
        
        this.delete('/:cid/products/:pid',['USER'],async(req,res)=>{
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
        })
        
        // METODO DELETE POR PRODUCTO 
        
        
        // METODO DELETE CARRITO 
        
        this.delete('/:id',['USER'],async(req,res)=>{
            const cid = req.params.id;
        
            const cart = await cartsService.getCartsById(cid);
            if(!cart) return res.sendNotFound("Cart doesn´t exist");
        
            const result = await cartsService.deleteCart(cid);
        
            return res.sendSuccess('Cart removed');
        })

    }

}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();