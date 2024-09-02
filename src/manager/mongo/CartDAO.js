import cartModel from './models/cart.model.js'

export default class CartDAO{
    
    async get(){
        return cartModel.find().populate('products.product');
    }

    async getOne(params){
        return cartModel.findOne(params).populate('products.product');;
    }

    async create(cart){
        return cartModel.create(cart);
    }

    async update(id,products){
        return cartModel.updateOne({_id:id},{$set:products});
    }

    async deleteProduct(id,productId){
        return cartModel.updateOne({_id:id},{$pull:{products:{product:productId}}});
    }

    async delete(id){
        return cartModel.updateOne(id,{$set:{products:[]}});
    }

}