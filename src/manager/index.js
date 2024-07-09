import ProductsManager from './mongo/ProductsManager.js';
import CartsManager from "./mongo/CartsManager.js";

export const productsService = new ProductsManager();
export const cartsService = new CartsManager();