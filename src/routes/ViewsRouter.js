import BaseRouter from "./BaseRouter.js";
import { passportCall } from "../middlewares/passportCall.js";
import { productsService } from "../manager/index.js";

class ViewsRouter extends BaseRouter {
    init(){

        this.get('/',passportCall('current'),(req,res)=>{
            if(!req.user){
                return res.redirect('/login');
            }
        
            res.render('Home',{
                title:'Index',
                css:'home',
                user: req.user
            });
        })

        this.get('/register/products',async (req,res)=>{
            const products = await productsService.getProducts();
        
            res.render('RegisterProducts',{
                title:"Registrar productos",
                css:'registerProducts',
                products:products
            })
        })
        
        this.get('/products',async (req, res)=>{
        
            const productsResponse  = await productsService.getProducts();
        
            const products = productsResponse.docs.map(product => ({
                id: product._id,
                title: product.title,
                thumbnails: product.thumbnails
            }));
        
            res.render('Products',{
                title:"Productos",
                css:"products",
                products:products
            })
        })
        
        this.get('/products/details/:id',async(req,res)=>{
            const pid = req.params.id;
            const productResponse = await productsService.getProductsById(pid);
        
            const product = {
                title: productResponse.title,
                description:productResponse.description,
                code:productResponse.code,
                price:productResponse.price,
                stock:productResponse.stock,
                thumbnails: productResponse.thumbnails
            };
        
            res.render('ProductDetails',{
                title:"Detalles de producto",
                css:"productDetails",
                product:product
            })
        })
        
        this.get('/register',(req,res)=>{
            res.render('Register',{
                title:'Registrar Usuario',
                css:'register'
            })
        })
        
        this.get('/login',(req,res)=>{
            res.render('Login',{
                title:'Iniciar sesion',
                css:'login'
            })
        })
        
        this.get('/profile',passportCall('current'),(req,res) =>{
        
            if(!req.user){
                return res.redirect('/login');
            }
        
            res.render('Profile',{
                title:"Perfil de usuario",
                css:'profile',
                user:req.user
            })
        
        })
    }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();