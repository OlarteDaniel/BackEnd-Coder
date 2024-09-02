export default class productDTOUpdate{
    id;
    title;
    description;
    price;
    stock;

    constructor(product){
        this.id= product._id;
        this.title= product.title;
        this.description=product.description;
        this.price=product.price;
        this.stock=product.stock;
    }
}