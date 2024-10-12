import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/setCookie.js";
import jwt from "jsonwebtoken";

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
export const getMyProfile = async (req, res) => {
    // --- with current user id we can get the user data
    // const id = "myId";

    // --- to get the current user id first check the user is logged in or not
    // --- after setting cookieparser middleware in app.js, now we can get the current user id from the cookie, we can get set token from the req.cookies

    const { token } = req.cookies;
    // console.log(token, "token from getMyProfile");

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Please login first."
        })
    }

    // --- now we can get the user id from the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded, "decoded");

    const user = await User.findById(decoded._id);
    // console.log(user, "user");

    res.status(200).json({
        success: true,
        user
    })
}