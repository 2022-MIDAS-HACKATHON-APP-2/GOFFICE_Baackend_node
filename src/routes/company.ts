import express from "express";
import * as controller from "../controllers/company";

const router = express();

router.post("/add", controller.AddCompany);

export default router;