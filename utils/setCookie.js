import jwt from "jsonwebtoken";

export const setCookie = (user, res, msg, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? "false" : "true"
    }).json({
        success: true,
        message: msg
    })
}


// to check API on postman, set sameSite to lax, otherwise set it to none
// to check API on postman, set secure to false, otherwise set it to true
// make sure the logout function should also have the sameSite and secure values as the setCookie function