
export default class TicketRepository{
    constructor(dao){
        this.dao = dao
    }

    getTickets(){
        return this.dao.get();
    }

    getTicketById(id){
        return this.dao.getOne({_id:id});
    }

    getTicketByCode(code){
        return this.dao.getOne({code:code});
    }

    createTicket(ticket){
        return this.dao.create(ticket);
    }
}