import ProductDTODetails from "../dto/product/ProductDTODetails.js";
import productDTOUpdate from "../dto/product/ProductDTOUpdate.js";
import ProductDTOWiew from "../dto/product/ProductDTOView.js";
import { productsService,usersService,cartsService } from "../services/services.js";

const home = (req,res)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    res.render('Home',{
        title:'Index',
        css:'home',
        user: req.user
    });
}

const registerProducts = async (req,res)=>{
    const products = await productsService.getProducts();

    res.render('RegisterProducts',{
        title:"Registrar productos",
        css:'registerProducts',
        products:products
    })
}

const viewsProducts = async (req, res)=>{
        
    const productsResponse  = await productsService.getProducts();

    const products = productsResponse.docs.map(product => new ProductDTOWiew(product));

    res.render('Products',{
        title:"Productos",
        css:"products",
        products:products
    })
}

const viewProductDetailsById = async(req,res)=>{
    const pid = req.params.id;
    const productResponse = await productsService.getProductsById(pid);

    const product = new ProductDTODetails(productResponse);

    res.render('ProductDetails',{
        title:"Detalles de producto",
        css:"productDetails",
        product:product,
        user:req.user
    })
}

const registerUser = (req,res)=>{
    res.render('Register',{
        title:'Registrar Usuario',
        css:'register'
    })
}

const login = (req,res)=>{
    res.render('Login',{
        title:'Iniciar sesion',
        css:'login'
    })
}

const profile = (req,res) =>{
        
    if(!req.user){
        return res.redirect('/login');
    }

    res.render('Profile',{
        title:"Perfil de usuario",
        css:'profile',
        user:req.user
    })

}

const cart = async (req,res) =>{
    const {uid} = req.params
    const user = await usersService.getUserById(uid)
    const cart = await cartsService.getCartsById(user.cart)

    const plainCart = JSON.parse(JSON.stringify(cart));

    const total = plainCart.products.reduce((accumulator, item) => {
        return accumulator + (item.product.price * item.quantity);
    }, 0);

    res.render('Cart',{
        title:'Carrito',
        css:'cart',
        cart: plainCart,
        cartTotal: total
    })

}

const updateProduct = async(req,res)=>{

    const {pid} = req.params;
    const productResponse = await productsService.getProductsById(pid);

    const product = new productDTOUpdate(productResponse);

    res.render('UpdateProduct',{
        title:'Modificar Productos',
        css:'updateProduct',
        product:product
    })

}

const unauthorized = (req,res)=>{
    res.render('Unauthorized',{
        title:'Acceso denegado',
        css:'unauthorized'
    })
}

export default{
    cart,
    home,
    login,
    profile,
    registerProducts,
    registerUser,
    unauthorized,
    updateProduct,
    viewProductDetailsById,
    viewsProducts
}