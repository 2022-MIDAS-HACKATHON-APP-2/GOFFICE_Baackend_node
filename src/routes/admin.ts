import express from "express";
import * as controller from "../controllers/admin";

const router = express();

router.post("/member", controller.viewMember);


export default router;