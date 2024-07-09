import fs from 'fs';

import __dirname from '../../utils.js';

const PATH = `${__dirname}/db/products.json`;

class ProductsManager{

    constructor(){
        this.init();
    }

    async init(){
        if(fs.existsSync(PATH)){
            console.log("Archivos products.json encontrado");
        }else{
            try {
                await fs.promises.writeFile(PATH,JSON.stringify([]));
            } catch (error) {
                console.log("El archivo products.json no pudo crearse");
                process.exit(1);
            }
        }
    }

    async getProducts(){
        try {
            const data = await fs.promises.readFile(PATH,'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getProductsById(id){
        try {
            const data = await fs.promises.readFile(PATH,'utf-8');
            const products = JSON.parse(data);
            
            const product = products.find((prod) => prod.id == id);

            if(!product){
                return null;
            }

            return product;

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async saveProducts(products){
        try {
            await fs.promises.writeFile(PATH,JSON.stringify(products,null,'\t'));
            return true;
        } catch (error) {
            return false;
        }
    }

    async createProduct({title,description,code,price,status=true,stock=1,category,thumbnails=[]}){
        const newProduct = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        }

        const products = await this.getProducts();

        if(!products){
            return -1;
        }

        if(products.length === 0){
            newProduct.id = 1;
        }else{
            newProduct.id = products[products.length-1].id+1;
        }

        products.push(newProduct);

        const created = await this.saveProducts(products);

        if(!created){
            return -1;
        }

        return newProduct.id;
    }

    async updateProduct(products){
        if(!products){
            return -1;
        }

        const created = await this.saveProducts(products);

        if(!created){
            return -1;
        }

        return 1;
    }
}

export default ProductsManager;