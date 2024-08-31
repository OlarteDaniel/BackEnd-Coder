import BaseRouter from "./BaseRouter.js";

import { passportCall } from "../middlewares/passportCall.js";
import sessionsController from "../controllers/sessions.controller.js";

class SessionsRouter extends BaseRouter{
    init(){

        this.post('/register',['PUBLIC'],passportCall('register'),sessionsController.register);
        
        this.post('/login',['PUBLIC'],passportCall('login'),sessionsController.login);
        
        this.get('/logout',['USER','ADMIN'],sessionsController.logout);
        
        this.get('/current',['USER','ADMIN'],passportCall('current'),sessionsController.current);

    }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();