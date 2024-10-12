import express from "express";
import userRouter from './routes/user.js';
import { config } from 'dotenv';
import cookieParser from "cookie-parser";

export const app = express();

// --- Configuring the environment variables
config({
    path: './config.env'
});

// --- using Middleware
app.use(express.json()); // should be above the routes
app.use(cookieParser()); // to get current user data for getMyProfile route 

// --- using the routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("working fine.");
})