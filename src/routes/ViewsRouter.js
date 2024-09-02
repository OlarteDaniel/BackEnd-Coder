import BaseRouter from "./BaseRouter.js";
import viewsController from "../controllers/views.controller.js";


class ViewsRouter extends BaseRouter {
    init(){

        this.get('/',['USER','ADMIN'],viewsController.home)

        this.get('/register/products',['ADMIN'],viewsController.registerProducts)
        
        this.get('/products',['USER','ADMIN'],viewsController.viewsProducts)
        
        this.get('/products/details/:id',['USER','ADMIN'],viewsController.viewProductDetailsById)
        
        this.get('/register/user',['PUBLIC'],viewsController.registerUser)
        
        this.get('/login',['PUBLIC'],viewsController.login)
        
        this.get('/profile',['USER'],viewsController.profile)

        this.get('/cart/:uid',['USER'],viewsController.cart)

        this.get('/unauthorized',['USER','ADMIN'],viewsController.unauthorized)
    }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();