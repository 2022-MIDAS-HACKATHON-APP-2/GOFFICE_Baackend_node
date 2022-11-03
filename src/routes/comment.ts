import express from "express";
import * as controller from "../controllers/comment";

const router = express();

router.get("/:post_id/comment", controller.writeComment);
router.patch("/:post_id/comment/:comment_id", controller.updateComment);
router.delete("/:post_id/comment/:comment_id", controller.deleteComment);

export default router;