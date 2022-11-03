import express from "express";
import User from "./user";
import Company from "./company";

const router = express();

router.use("/user", User);
router.use("/company", Company);

export default router;