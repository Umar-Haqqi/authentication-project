import express from "express";
import userRouter from './routes/user.js';
import { config } from 'dotenv';

export const app = express();

// --- Configuring the environment variables
config({
    path: './config.env'
});

// --- using Middleware
app.use(express.json()); // should be above the routes

// --- using the routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("working fine.");
})