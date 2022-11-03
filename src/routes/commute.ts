import express from "express";
import * as controller from "../controllers/commute";
import { authMiddleware } from "../middlewares/auth";

const router = express();

router.post('/start', authMiddleware, controller.goWork)


export default router;