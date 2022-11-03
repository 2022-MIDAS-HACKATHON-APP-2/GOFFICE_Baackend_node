import express from "express";
import * as controller from "../controllers/commute";
import { authMiddleware } from "../middlewares/auth";

const router = express();

router.post('/start',  controller.goWork)
router.post('/end',  controller.exitWork)


export default router;