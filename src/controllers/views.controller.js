import { productsService } from "../manager/index.js";

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
}

const viewProductDetailsById = async(req,res)=>{
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

const unauthorized = (req,res)=>{
    res.render('Unauthorized',{
        title:'Acceso denegado',
        css:'unauthorized'
    })
}

export default{
    home,
    login,
    profile,
    registerProducts,
    registerUser,
    unauthorized,
    viewProductDetailsById,
    viewsProducts
}