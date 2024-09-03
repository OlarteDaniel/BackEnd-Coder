export default class ProductDTOWiew{
    id;
    title;
    stock;
    status;
    thumbnails;

    constructor(product){
        this.id = product._id;
        this.title = product.title;
        this.stock = product.stock;
        this.status = product.status;
        this.thumbnails = product.thumbnails
    }
}