import BaseRouter from "./BaseRouter.js";

import uploader from '../services/uploadService.js';
import productsController from "../controllers/products.controller.js";

class ProductsRouter extends BaseRouter{
    init(){
        // METODO GET

        this.get('/',['USER','ADMIN'],productsController.getAll)

        // METODO GET


        // METODO GET POR ID

        this.get('/:id',['USER','ADMIN'],productsController.getOneById)

        // METODO GET POR ID


        // METODO POST

        this.post('/',['ADMIN'],uploader.array('thumbnails',3),productsController.createProduct)

        // METODO POST


        // METEDO PUT

        this.put('/:id',['ADMIN'],productsController.updateProduct)

        // METEDO PUT


        // METODO DELETE

        this.delete('/:id',['ADMIN'],productsController.clearProduct)

        // METODO DELETE
    }
}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();