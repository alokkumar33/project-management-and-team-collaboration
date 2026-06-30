import express from "express";
import { verifyToken, adminOnly } from "../utils/verifyUser.js";
import { getUsers } from "../controller/user.controller.js";

const router = express.Router();

//user management routes
router.get("/get-users", verifyToken, adminOnly, getUsers);

export default router;