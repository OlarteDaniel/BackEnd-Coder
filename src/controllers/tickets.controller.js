import { cartsService, ticketService, usersService,productsService } from "../services/services.js";
import { generarCodigo } from "../utils.js";

const getAll = async(req,res) =>{

    const tickets = await ticketService.getTickets()

    if(tickets.length === 0){
        return res.sendNotFound('There are no purchases made');
    }

    return res.sendSuccessWithPayload(tickets);
}

const createTicket = async(req,res) =>{
    const {cid} = req.params

    const codigo = generarCodigo(4)

    const cart = await cartsService.getCartsById(cid)
    const plainCart = JSON.parse(JSON.stringify(cart));
    const total = plainCart.products.reduce((accumulator, item) => {
        return accumulator + (item.product.price * item.quantity);
    }, 0);

    const purchase_datetime = new Date().toDateString();

    const user = await usersService.getUserById(req.user.id);
    const email = user.email;

    //---------------VALIDACIONES---------------

    const productsObtened = await productsService.getProducts();

    for (const item of plainCart.products) {
        const productInStock = productsObtened.docs.find(p => p._id.toString() === item.product._id.toString());

        if (!productInStock) {
            return res.sendNotFound(`Producto con ID ${item.product._id} no encontrado en el catálogo.`);
        }

        if (item.quantity > productInStock.stock) {
            return res.sendBadRequest(`La cantidad del producto ${item.product.title} en el carrito (${item.quantity}) excede el stock disponible (${productInStock.stock}).`)
        }
    }

    //---------------VALIDACIONES---------------

    const newTicket = {
        code:codigo,
        purchase_datetime,
        amount: total,
        purchase: email
    }

    const result = await ticketService.createTicket(newTicket);

    if(!result){
        return res.sendBadRequest('Could not create Ticket');
    }

    return res.sendSuccess('Ticket created');
}

export default{
    createTicket,
    getAll
}