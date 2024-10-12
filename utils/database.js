import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backend"
    }).then((c) => {
        console.log(`Connected to database: ${c.connection.host}`);
    }).catch((err) => {
        console.log("Error connecting to database: ", err);
    });
}