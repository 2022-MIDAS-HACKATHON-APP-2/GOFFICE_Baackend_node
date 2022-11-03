import express from "express";
import * as controller from "../controllers/admin";

const router = express();

router.get("/member/:member_id", controller.viewOneMember);
router.get("/member", controller.viewMember);
router.patch("/member/:member_id", controller.fixMember);
router.delete("/member/:member_id", controller.deleteMember);
router.get("/resting", controller.veiwRestRes);
router.post("/resting/approve", controller.restRes);
router.post("/resting/unapprove", controller.restResFail);

export default router;