import ProductsManager from './mongo/ProductsManager.js';
import CartsManager from "./mongo/CartsManager.js";
import UserManager from './mongo/UsersManager.js';

export const productsService = new ProductsManager();
export const cartsService = new CartsManager();
export const usersService = new UserManager();