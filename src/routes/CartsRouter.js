import BaseRouter from './BaseRouter.js'

import cartsController from '../controllers/carts.controller.js';

class CartsRouter extends BaseRouter{

    init(){

        this.get('/',['ADMIN'],cartsController.getAll)
        
        // METODO GET
        
        
        // METODO GET POR ID
        this.get('/:id',['USER'],cartsController.getOneById)
        
        // METODO GET POR ID
        
        
        // METODO POST POR CARRITO 
        
        this.post('/:uid/products/:pid',['USER'],cartsController.addCart)
        
        // METODO POST POR CARRITO 
        
        
        // METODO PUT POR CARRITO
        
        this.put('/:id',['USER'],cartsController.updatedCart);
        
        // METODO PUT POR CARRITO
        
        
        // METODO PUT POR CANTIDAD DE PRODUCTOS
        
        this.put('/:cid/products/:pid',['USER'],cartsController.updateQuantityCart)
        
        // METODO PUT POR CANTIDAD DE PRODUCTOS
        
        
        // METODO DELETE POR PRODUCTO 
        
        this.delete('/:cid/products/:pid',['USER'],cartsController.removeProduct)
        
        // METODO DELETE POR PRODUCTO 
        
        
        // METODO DELETE CARRITO 
        
        this.delete('/:id',['USER'],cartsController.clearCart)

        // METODO DELETE CARRITO 
    }

}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();