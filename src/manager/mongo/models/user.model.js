import mongoose from "mongoose";

const colecction = 'Users';

const schema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    age:Number,
    password:{
        type:String,
        required:true
    },
    cart:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Carts'
    },
    roles:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
});

const userModel = mongoose.model(colecction,schema);

export default userModel;