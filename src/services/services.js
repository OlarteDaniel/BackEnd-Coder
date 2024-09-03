import UserRepository from "../repositories/UserRepository.js";
import UserDAO from "../manager/mongo/UserDAO.js";

import ProductRepository from "../repositories/ProductRepository.js";
import ProductDAO from "../manager/mongo/ProductDAO.js";

import CartRepository from "../repositories/CartRepository.js";
import CartDAO from "../manager/mongo/CartDAO.js";

import TicketRepository from "../repositories/TicketRepository.js";
import TicketDAO from "../manager/mongo/TicketDAO.js";

export const usersService = new UserRepository(new UserDAO());
export const productsService = new ProductRepository(new ProductDAO());
export const cartsService = new CartRepository(new CartDAO());
export const ticketService = new TicketRepository(new TicketDAO);