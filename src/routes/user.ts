import express from "express";
import * as controller from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";

const router = express();

router.get("/mypage", authMiddleware, controller.showMyPage);
router.post("/signup", controller.createUser);
router.post("/login", controller.login);
router.get("/:user_id", controller.showInfo);

export default router;