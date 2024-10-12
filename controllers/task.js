import { Task } from "../models/task.js"

export const newTask = async (req, res) => {
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
}

export const getMyTasks = async (req, res) => {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
        success: true,
        tasks
    })
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found."
        })
    }

    // --- updating the task status
    task.isCompleted = !task.isCompleted;

    // --- saving the updated task
    await task.save();

    res.status(200).json({
        success: true,
        message: "Task status updated successfully."
    })
};

export const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found."
        })
    }

    // --- deleting the task
    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task deleted successfully."
    })
};

