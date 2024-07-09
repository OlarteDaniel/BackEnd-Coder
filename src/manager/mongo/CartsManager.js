import cartModel from './models/cart.model.js'

export default class CartsManager{
    
    async getCarts(){
        return cartModel.find().populate('products.product');
    }

    async getCartsById(cartId){
        return cartModel.findOne({_id:cartId}).populate('products.product');
    }

    async createCart(cart){
        return cartModel.create(cart);
    }

    async modifyProducto(cartId,products){
        return cartModel.updateOne({_id:cartId},{$set:products});
    }

    // async updateProduct(cartId,products){
    //     return cartModel.updateOne({_id:cartId},{products:products});
    // }

    async deleteProduct(cartId,productId){
        return cartModel.updateOne({_id:cartId},{$pull:{products:{product:productId}}});
    }

    async deleteCart(cartId){
        return cartModel.updateOne({_id:cartId},{$set:{products:[]}});
    }

}