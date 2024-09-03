import ticketModel from "./models/ticket.model.js";

export default class TicketDAO{

    async get(){
        return ticketModel.find();
    }

    async getOne(params){
        return ticketModel.findOne(params);
    }

    async create(ticket){
        return ticketModel.create(ticket);
    }

}