import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose"
import { userRouter } from "./routes/user.route.js";
import cors from "cors"
import { roomNdeviceRouter } from "./routes/roomNdevice.route.js";
import { routineRoute } from "./routes/routine.route.js";
const app=express();

app.use(cors({
  origin: 'https://vsmarthomes.netlify.app', 
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true 
}));

app.use(express.json())

app.use("/user",userRouter)
app.use("/roomNdevice",roomNdeviceRouter)
app.use("/routine",routineRoute)

const mongodb= process.env.MONGODB_URL;

app.listen(process.env.PORT,async()=>{
  await mongoose.connect(mongodb,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  console.log("Database connected");
  console.log("server started at http://localhost:4000")
})