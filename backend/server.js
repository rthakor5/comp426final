import express from "express";
import mongoose from "mongoose";
import path from 'path';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from './routers/upload.js';

// IN HOUSE APIS FOR APP DURING COMMUNICATION BETWEEN BACKEND AND FRONTEND CHANGES


// ENV CONFIGURATION FOR API KEYS AND EXPRESS 
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/EcommerceWebsite", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
app.use('/api/uploads', uploadRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// SECOND THIRD-PARTY API - PAYPAL API TO ALLOW USER TO SIGN IN TO THEIR PAYPAL ACCOUNTS 
// AND PAY FOR THEIR ORDERS. CURRENTLY IN TEST MODE NOT PRODUCTION SO USERS WILL NOT
// ACTUALLY BE CHARGED 
app.use("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// FOURTH THIRD-PARTY API - GOOGLE MAPS AND PLACES API TO ALLOW USER TO SELECT THEIR DESIRED DELIEVERY ADDRESS
// FOR THEIR ORDERS 
app.use("/api/config/google", (req, res) => {
    res.send(process.env.GOOGLE_KEY || '');
});

// SERVER CONFIGURATION FOR IMAGE UPLOAD DURING ADMIN PRODUCT CREATION
//
// DOES NOT INVOLVE USER

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get("/", (req, res) => {
    res.send("server is ready");
});
app.use((error, req, res, next) => {
    res.status(500).send({message:error.message});
});
const temp = process.env.PORT || 5000;
app.listen(temp, () => {
    console.log(`serve at http://localhost:${temp}`);
});