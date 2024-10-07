import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backend"
    }).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log("Error connecting to database: ", err);
    });
}