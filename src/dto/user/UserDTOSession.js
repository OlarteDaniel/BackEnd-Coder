export default class UserDTOSession{
    id;
    name;
    role;

    constructor(user){
        this.id =  user._id;
        this.name = `${user.first_name} ${user.last_name}`;
        this.role = user.roles;
    }
}