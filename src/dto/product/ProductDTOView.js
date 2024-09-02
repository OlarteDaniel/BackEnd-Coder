export default class ProductDTOWiew{
    id;
    title;
    thumbnails;

    constructor(product){
        this.id = product._id;
        this.title = product.title;
        this.thumbnails = product.thumbnails
    }
}