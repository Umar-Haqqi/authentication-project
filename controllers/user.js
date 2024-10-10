import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/setCookie.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({});

    res.status(200).json({
        success: true,
        users
    })
}

export const login = async (req, res, next) => { }

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const isSameEmail = await User.findOne({ email });
    const isSameName = await User.findOne({ name });

    // --- if user email already exists then return error
    if (isSameEmail) {
        return res.status(404).json({
            success: false,
            message: "email already exists."
        })
    }

    // --- if user name already exists then return error
    if (isSameName) {
        return res.status(404).json({
            success: false,
            message: "username already exists."
        })
    }

    // --- hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
        {
            name,
            email,
            password: hashedPassword  // key should be same as schema
        }
    )

    // --- setting the cookie
    setCookie(user, res, "User registered successfully.", 201);
};

export const getUserDetails = async (req, res) => { }