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
    // as password is set to select: false in schema, so to access and use password from database, will have to use 'select("+password")'

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
            password: hashedPassword  // key should be same as schema
        }
    )

    // --- setting the cookie
    setCookie(user, res, "User registered successfully.", 201);
};

export const getUserDetails = async (req, res) => { }