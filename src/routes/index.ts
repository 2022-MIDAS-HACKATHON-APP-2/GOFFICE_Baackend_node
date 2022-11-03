import express from "express";
import User from "./user";
import Company from "./company";
import Admin from "./admin";
import Post from "./post";
import { authMiddleware } from "../middlewares/auth";
const router = express();

router.use("/admin", authMiddleware, Admin);
router.use("/post", authMiddleware, Post)
router.use("/user", User);
router.use("/company", Company);

export default router;