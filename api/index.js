import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routers/user.route.js";
import authRoutes from "./routers/auth.route.js";
import { error } from "console";

dotenv.config();

const app = express();


app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((error) => console.log(error));
 
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


app.use((error,req,res,next)=>
{
    const statusCode = error.statusCode || 500
    const message = error.message || "Internal server error"
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})