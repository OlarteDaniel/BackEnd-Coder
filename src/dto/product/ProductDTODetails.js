export default class ProductDTODetails{
    id;
    title;
    description;
    code;
    price;
    stock;
    thumbnails;

    constructor(product){
        this.id= product._id;
        this.title= product.title;
        this.description=product.description;
        this.code=product.code;
        this.price=product.price;
        this.stock=product.stock;
        this.thumbnails= product.thumbnails;
    }
}