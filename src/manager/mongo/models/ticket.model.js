import mongoose from "mongoose";

const colecction = 'Tickets'

const schema = new mongoose.Schema({
    code:{
        type:String,
        unique:true,
        required:true
    },
    purchase_datetime : Date,
    amount:{
        type:Number,
        required:true
    },
    purchaser: {
        type: String,
        require: true,
    }
})

const ticketModel = mongoose.model(colecction,schema);

export default ticketModel