import express from "express";
import { deleteUser, getAllUsers, getSpecialUser, getUserById, register, updateUser } from "../controllers/user.js";

const router = express.Router();

// --- Get all users
router.get("/all", getAllUsers)

// --- Add a new user
router.post("/new", register)

// --- Get special user
router.get("/userid/special", getSpecialUser)

// --- Chaining same routes
router.route("/userid/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;