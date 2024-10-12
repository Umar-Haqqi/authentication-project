import express from "express";
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import { config } from 'dotenv';
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from 'cors';

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
app.use("/api/tasks", taskRouter);

// --- cors middleware
app.use(cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("working fine.");
})

// --- using error middleware
app.use(errorMiddleware);