import {productsService} from '../manager/index.js';

const getAll = async(req,res) =>{
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const products = await productsService.getProducts(page,limit);
    
    if(products.length === 0){
        return res.sendNotFound('There are no registered products');
    }

    const prevLink = () =>{
        if(products.hasPrevPage){
            return `http://localhost:8080/api/products?page=${products.prevPage}`
        }else{
            return null;
        }
    }

    const nextLink = () =>{
        if(products.hasNextPage){
            return `http://localhost:8080/api/products?page=${products.nextPage}`
        }else{
            return null;
        }
    }

    return res.send({
        status:"sucess",
        payload:products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: prevLink(),
        nextLink: nextLink()
    });

}

const getOneById = async(req,res) =>{
    const pid = req.params.id;

    const product = await productsService.getProductsById(pid);

    if(!product){
        return res.sendNotFound('Product not found');
    }

    return res.sendSuccessWithPayload(product);
}

const createProduct = async(req,res) =>{
            
    const {title,description,code,price,stock,category} = req.body;
    const thumbnails = [];

    if(!title || !description || !code || !price || !category){
        return res.sendBadRequest('Information missing');
    }

    for(let i=0; i<req.files.length;i++){
        thumbnails.push({mimetype:req.files[i].mimetype,path:`/upload/products${req.files[i].filename}`,main:i==0})
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        stock: stock || 1,
        category,
        thumbnails
    }

    const result = await productsService.createProduct(newProduct);

    if(!result){
        return res.sendBadRequest('Could not create product');
    }

    return res.sendSuccess('Product created');
}

const updateProduct = async(req,res)=>{
    const pid = req.params.id;
    const data = req.body;

    const product = await productsService.getProductsById(pid);

    if(!product){
        return res.sendNotFound('Product not found');
    }

    if(!data.title || !data.description || !data.price || !data.price){
        return res.sendBadRequest('Information missing');
    }

    const updateProduct = {
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
    }

    const result = await productsService.updateProduct(pid,updateProduct);

    res.sendSuccess('Updated product')

}

const clearProduct = async(req,res) =>{
    const pid = req.params.id;

    const result = await productsService.deleteProduct(pid);
    
    console.log(result);

    if(result.deletedCount < 1){
        return res.sendBadRequest('The product to be removed does not exist')
    }

    return res.sendSuccess('product removed');
}

export default {
    clearProduct,
    createProduct,
    getAll,
    getOneById,
    updateProduct
}