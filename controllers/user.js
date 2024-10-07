import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json({
        success: true,
        message: "All users fetched successfully",
        users
    })
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    })

    res.status(200).cookie("token", "cookieToken").json({
        success: true,
        message: "User added successfully in the database",
    })
}

export const getSpecialUser = async (req, res) => {
    res.json({
        success: true,
        message: "Special user fetched successfully",
    })
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    const user = await User.findById(id);
    res.json({
        success: true,
        message: "User fetched successfully",
        user
    })
}

export const updateUser = async (req, res) => {
    res.json({
        success: true,
        message: "User Data Updated successfully",
    })
}

export const deleteUser = async (req, res) => {
    res.json({
        success: true,
        message: "User deleted successfully",
    })
}