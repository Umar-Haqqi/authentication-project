import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Please login first."
        })
    }

    // --- to access current logged in user from the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // --- saving the user in the request object
    req.user = await User.findById(decoded._id);

    // --- calling the next middleware, so that the request can reach to the controller
    next();
};