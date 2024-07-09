import productModel from "./models/product.model.js";

export default class ProductsManager{
    
    async getProducts(page,limit){
        return productModel.paginate({},{page:page,limit:limit});
    }

    async getProductsById(productId){
        return productModel.findOne({_id:productId});
    }

    async createProduct(product){
        return productModel.create(product);
    }

    async updateProduct(idProduct,product){
        return productModel.updateOne({_id:idProduct},{$set:product})
    }

    async deleteProduct(productId){
        return productModel.deleteOne({_id:productId});
    }
p
}