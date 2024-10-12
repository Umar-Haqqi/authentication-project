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

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    // --- if user email does not exists then return error
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password."
        })
    }

    // --- comparing the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(404).json({
            success: false,
            message: "Invalid Email or Password."
        })
    }

    setCookie(user, res, `Welcome ${user.name}`, 200);
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const isUserExist = await User.findOne({ email });

    // --- if user email already exists then return error
    if (isUserExist) {
        return res.status(404).json({
            success: false,
            message: "email already exists."
        })
    }

    // --- hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create(
        {
            name,
            email,
            password: hashedPassword
        }
    )

    // --- setting the cookie
    setCookie(user, res, "User registered successfully.", 201);
};

// --- to get current user data
export const getMyProfile = (req, res) => {
    // --- user data is already saved in the request object in the auth middleware

    res.status(200).json({
        success: true,
        user: req.user // --- in the auth middleware, we saved the user in the request object
    })
}