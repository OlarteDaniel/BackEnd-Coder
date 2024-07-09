import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'Products';

const schema = new mongoose.Schema({
    title:String,
    description:String,
    code:String,
    price:Number,
    status:{
        type:Boolean,
        default:true
    },
    stock:Number,
    category:String
});

schema.plugin(mongoosePaginate);

const productModel = mongoose.model(collection,schema);

export default productModel;