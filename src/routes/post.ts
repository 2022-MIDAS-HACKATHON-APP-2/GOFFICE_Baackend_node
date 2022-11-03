import express from "express";
import * as controller from "../controllers/post";

const router = express();

router.post("/", controller.CreatePost);
router.get("/", controller.readAllPost);
router.delete("/:post_id", controller.deletePost);
router.patch("/post_id", controller.updatePost);
router.get("/:post_id", controller.readOnePost);

export default router;