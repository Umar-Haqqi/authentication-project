import express from "express";
import userRouter from './routes/user.js';
import { config } from 'dotenv';

export const app = express();

// --- Configuring the environment variables
config({
    path: './config.env'
});

// --- using Middleware
app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("working fine.");
})