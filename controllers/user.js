import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const isUserExist = await User.findOne({ email });

    // --- if user already exists then return error
    if (isUserExist) {
        return res.status(404).json({
            success: false,
            message: "User already exists."
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

    // --- we can redirect to login page if success is true or
    // res.status(201).json({
    //     success: true,
    //     message: "User registered successfully."
    // })

    // --- if we want to login user automatically after registration then we can send cookie token here

    // --- generating token here with jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes

    }).json({
        success: true,
        message: "User registered successfully."
    })
};

export const getUserDetails = async (req, res) => { }