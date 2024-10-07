import mongoose from "mongoose";

// --- User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

// --- User Model
export const User = mongoose.model("User", userSchema);