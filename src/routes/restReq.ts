import express from "express";
import * as controller from "../controllers/restReq";

const router = express();

router.post("/", controller.sendRestReq);
router.get("/", controller.viewMyRest);

export default router;