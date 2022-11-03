import express from "express";
import * as controller from "../controllers/auth";

const router = express();

router.post("/signup", controller.createUser);
router.post("/login", controller.login);

export default router;