import mongoose from "mongoose";

// --- User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        // --- now by setting 'select: false' can't access password from database, then will have to use 'select("+password")'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// --- User Model
export const User = mongoose.model("User", userSchema);