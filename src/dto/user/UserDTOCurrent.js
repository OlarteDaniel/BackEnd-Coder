export default class UserDTOCurrent{
    name;
    role;

    constructor(user){
        this.name = user.name;
        this.role = user.role;
    }
}