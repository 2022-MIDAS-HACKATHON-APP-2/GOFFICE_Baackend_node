import express from "express";
import User from "./user";
import Company from "./company";
import Admin from "./admin";
import Post from "./post";
// import Commute from "./commute";
import Comment from "./comment";
import RestReq from "./restReq";
import { authMiddleware } from "../middlewares/auth";

const router = express();

router.use("/rest", authMiddleware, RestReq);
router.use("/post", authMiddleware,Comment);
router.use("/admin", authMiddleware, Admin);
router.use("/post", authMiddleware, Post);
router.use("/commute", authMiddleware, Commute);
router.use("/user", User);
router.use("/company", Company);

export default router;