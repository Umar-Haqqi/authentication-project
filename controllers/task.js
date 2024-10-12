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

    // --- isAuthenticated middleware set in the route
    // --- we get logged in user from the request object, which is set in the middleware
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
        success: true,
        tasks
    })
};