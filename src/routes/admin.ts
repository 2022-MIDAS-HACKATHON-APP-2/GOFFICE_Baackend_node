import express from "express";
import * as controller from "../controllers/admin";

const router = express();

router.get("/member/:member_id", controller.viewOneMember);
router.get("/member", controller.viewMember);
router.patch("/member/:member_id", controller.fixMember);

export default router;