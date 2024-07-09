import fs from 'fs';

import __dirname from '../../utils.js';

const PATH = `${__dirname}/db/carts.json`;

class CartsManager{

    constructor(){
        this.init();
    }

    async init(){
        if(fs.existsSync(PATH)){
            console.log("Archivo carts.json encontrado");
        }else{
            try {
                await fs.promises.writeFile(PATH,JSON.stringify([]))
            } catch (error) {
                console.log("El archivo carts.json no pudo crearse: ",error);
                process.exit(1);
            }
        }
    }

    async getCarts(){
        try {
            const data = await fs.promises.readFile(PATH,'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return null;
        }
    }

    async getCartById(id){
        try {
            const data = await fs.promises.readFile(PATH,'utf-8');
            const carts = JSON.parse(data);

            const cart = carts.find((cart) => cart.id == id);

            if(!cart){
                return null;
            }

            return cart;

        } catch (error) {
            return null;
        }
    }

    async savedCarts(carts){
        try {
            await fs.promises.writeFile(PATH,JSON.stringify(carts,null,'\t'));
            return true;
        } catch (error) {
            return false;
        }
    }

    async createCart(){
        const newCart = {
            products : []
        };

        const carts = await this.getCarts();

        if(!carts){
            return -1;
        }

        if(carts.length === 0){
            newCart.id = 1;
        }else{
            newCart.id = carts[carts.length-1].id+1;
        }
        carts.push(newCart);

        const created = await this.savedCarts(carts);

        if(!created){
            return -1;
        }

        return newCart.id;
    }

    async addProduct(cartId,productId){
        const carts = await this.getCarts();

        const cartIndex = carts.findIndex((cart) => {
            return cart.id == cartId;
        })

        if(cartIndex === -1){
            return null;
        }

        const productIndex = carts[cartIndex].products.findIndex((prod) =>{
            return prod.productId == productId;
        });

        if(productIndex === -1){
            carts[cartIndex].products.push({ productId, quantity: 1 });
        }else{
            carts[cartIndex].products[productIndex].quantity ++;
        }

        const created = await this.savedCarts(carts);

        if(!created){
            return -1;
        }

        return true;
    }
}

export default CartsManager;