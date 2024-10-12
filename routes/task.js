import express from "express";
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// --- passing the middleware isAuthenticated, this will allow only authenticated users to create a new task
router.post("/new", isAuthenticated, newTask)
router.get("/myTasks", isAuthenticated, getMyTasks)

// --- to update and delete the task
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;