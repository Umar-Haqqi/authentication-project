import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/setCookie.js";
import ErrorHandler from "../middleware/errorMiddleware.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        // --- if user email does not exists then return error
        if (!user) return next(new ErrorHandler("Invalid Email or Password.", 400))

        // --- comparing the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return next(new ErrorHandler("Invalid Email or Password.", 400))

        setCookie(user, res, `Welcome ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const isUserExist = await User.findOne({ email });

        // --- if user email already exists then return error
        if (isUserExist) return next(new ErrorHandler("Email already exists.", 404))

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
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = (req, res, next) => {
    try {
        // --- user data is already saved in the request object in the auth middleware
        res.status(200).json({
            success: true,
            user: req.user // --- in the auth middleware, we saved the user in the request object
        })
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res, next) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? "false" : "true"
        }).json({
            success: true,
            message: "Logged out successfully."
        })
    } catch (error) {
        next(error);
    }
}