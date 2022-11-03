import express from "express";
import User from "./user";
import Company from "./company";
import Admin from "./admin";
import Post from "./post";
import Commute from "./commute";

import { authMiddleware } from "../middlewares/auth";

const router = express();

router.use("/admin", authMiddleware, Admin);
router.use("/post", authMiddleware, Post)
router.use("/user", User);
router.use("/company", Company);
router.use("/commute", authMiddleware, Commute);

export default router;