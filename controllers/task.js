import ErrorHandler from "../middleware/errorMiddleware.js"
import { Task } from "../models/task.js"

export const newTask = async (req, res) => {
    try {
        const { title, description } = req.body

        await Task.create({
            title,
            description,
            user: req.user
        })

        res.status(201).json({
            success: true,
            message: "Task created successfully."
        })
    } catch (error) {
        next(error);
    }
}

export const getMyTasks = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const tasks = await Task.find({ user: userId });

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id)

        // --- if task not found, it will stop the execution bacause of next and will return the error
        if (!task) return next(new ErrorHandler("Task not found, Invalid Id", 404))

        // --- updating the task status
        task.isCompleted = !task.isCompleted;

        // --- saving the updated task
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task status updated successfully."
        })
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id)

        if (!task) return next(new ErrorHandler("Task not found, Invalid Id", 404))

        // --- deleting the task,
        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully."
        })
    } catch (error) {
        next(error);
    }
};

