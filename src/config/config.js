import { config } from "dotenv";

config();

export default{
    app:{
        PORT: process.env.PORT || 8080
    },
    auth:{
        jwt:{
            SECRET: process.env.JWT_SECRET
        }
    },
    mongo:{
        URL: process.env.MONGO_URL
    }
}