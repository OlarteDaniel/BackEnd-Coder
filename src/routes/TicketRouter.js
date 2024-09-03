import BaseRouter from "./BaseRouter.js";
import ticketsController from '../controllers/tickets.controller.js'

class TicketRouter extends BaseRouter{
    init(){

        this.get('/',['USER'],ticketsController.getAll)

        this.post('/:cid',['USER'],ticketsController.createTicket)

    }
}

const ticketRouter = new TicketRouter();

export default ticketRouter.getRouter();