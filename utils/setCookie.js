import jwt from "jsonwebtoken";

export const setCookie = (user, res, msg, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000, // 15 minutes

    }).json({
        success: true,
        message: msg
    })
}