import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import userRoute from './routes/user.route.js';
import cookieParser from "cookie-parser";
import messsageRoute from "./routes/messsage.route.js";
import cors from "cors";



const app = express();


dotenv.config();

connectDB()

const PORT =  8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use( cookieParser());

const corsOption = {
    origin : 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOption))

app.use("/api/user",userRoute);
app.use("/api/message",messsageRoute)



app.listen(PORT,()=>{
    console.log(` Server listen at port ${PORT}`)
});