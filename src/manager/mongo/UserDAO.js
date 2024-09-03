import usersModel from "./models/user.model.js";

export default class UserDAO {

    async get(){
        return usersModel.find();
    }

    async getOne(params){
        return usersModel.findOne(params)
    }

    async create(user){
        return usersModel.create(user);
    }
}