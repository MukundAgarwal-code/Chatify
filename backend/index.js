// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
dotenv.config({});

 
const PORT = process.env.PORT || 5000;

// middleware
const corsOption={
    origin:["http://localhost:3000", "https://chatify-one-steel.vercel.app"],
    credentials:true
};
app.use(cors(corsOption)); 
app.set("trust proxy", 1);
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));



// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});

