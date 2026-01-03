import express, { urlencoded } from "express";
import connectDB from "./util/db.js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

import userRoutes from './routes/user.route.js'
import examRoutes from './routes/exam.route.js'
import adminRoutes from './routes/admin.route.js'


dotenv.config();
const app = express();
const port = 8080 || process.env.PORT;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 min
  max: 9, // max requests per IP
  message: "Too many requests, try again later"
});

var corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  Credential:true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(express.json({limit:"3mb"}));
app.use(express.urlencoded({extended:true,limit:"3mb"}));


connectDB();


//routes are here

app.use("/api/user-account",limiter,userRoutes);
app.use("/api/browse",examRoutes);
app.use("/api/admin/",adminRoutes);







app.get("/",limiter,(req,res)=>{
    res.json({
        message:"server started"
    })
});




app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})

