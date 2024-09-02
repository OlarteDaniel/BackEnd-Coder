import usersModel from "./models/user.model.js";

export default class UserManager {

    getUsers(){
        return usersModel.find();
    }

    getUserById(userId){
        return usersModel.findById(userId);
    }

    getUserByEmail(userEmail){
        return usersModel.findOne({email:userEmail});
    }

    getUserByCart(cart){
        return usersModel.findOne({cart:cart})
    }

    createUser(user){
        return usersModel.create(user);
    }
}