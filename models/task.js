import mongoose from "mongoose";

// --- User Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.type.ObjectId, // userId in database
        ref: User, // refernce collection name  (set model name)
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// --- User Model
export const Task = mongoose.model("Task", taskSchema);