import express from "express";
import { verifyToken, adminOnly } from "../utils/verifyUser.js";
import { getUserById, getUsers } from "../controller/user.controller.js";

const router = express.Router();

//user management routes
router.get("/get-users", verifyToken, adminOnly, getUsers);


router.get("/:id", verifyToken, getUserById);
export default router;