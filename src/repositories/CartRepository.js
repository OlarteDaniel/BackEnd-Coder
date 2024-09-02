
export default class CartRepository{
    constructor(dao){
        this.dao = dao;
    }

    getCarts(){
        return this.dao.get();
    }

    getCartsById(id){
        return this.dao.getOne({_id:id});
    }

    createCart(cart){
        return this.dao.create(cart);
    }

    modifyProducto(cartId,products){
        return  this.dao.update(cartId,products);
    }

    deleteProduct(cartId,productId){
        return this.dao.deleteProduct(cartId,productId);
    }

    deleteCart(id){
        return this.dao.delete({_id:id});
    }
}